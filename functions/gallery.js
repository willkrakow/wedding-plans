const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const Airtable = require("airtable");

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body);
    
    try {
    const imageUpload = await cloudinary.uploader.upload(data.image, {
        context: {caption: data.caption},
    });
      if (imageUpload) {
        const imageResponse = {
          ...imageUpload,
          caption: data.caption,
        };

        const currentTime = new Date()
        const date = formatDate(currentTime)

        const imageRecord = await base("Photos").create({
            src: [{ url: imageUpload.url }],
            description: data.caption,
            title: "Wedding day!",
            location: "Hillsborough, NC",
            date,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Image uploaded successfully",
                data: imageResponse
            }),
        }
      }


    //     console.log(imageRecord);
    //     return {
    //       statusCode: 200,
    //       body: JSON.stringify({
    //         message: "File uploaded",
    //         data: {
    //           ...imageResponse,
    //         },
    //       }),
    //     };
    //   }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "File upload failed",
          data: {},
        }),
      };
    }
  }
};
