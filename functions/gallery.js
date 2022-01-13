const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
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


exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const { image, caption } = JSON.parse(event.body);

        const imageUpload = await cloudinary.uploader.upload(image, { folder: "Wedding" })
        if (imageUpload) {
            const imageResponse = {
                ...imageUpload,
                caption: caption
            }

            const time = new Date().toISOString();
            const imageRecord = await base("Photos").create({
                src: [{url: imageUpload.url}],
                description: caption,
                title: "Wedding day!",
                location: "Hillsborough, NC",
                date: time,
            })

            console.log(imageRecord)
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "File uploaded",
                    data: {
                        ...imageResponse
                    }
                }),
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "File upload failed",
                data: {}
            }),
        }
    }
};
