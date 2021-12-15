require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
var Airtable = require("airtable");

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);

async function getFamilyData(familyName){
    const family = await base
        .table("guest_list")
        .select({
            filterByFormula: `family = '${familyName}'`,
        })
        .all()
    return family;
}

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    const { familyName } = event.queryStringParameters;
    console.log(familyName);
    const decodedName = decodeURIComponent(familyName);

    const family = await getFamilyData(decodedName);
    
    if (family.length === 0) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "No family found",
            }),
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            data: family,
        }),
    }
    // const decodedFamilyName = decodeURIComponent(familyName);                
    // const base = new Airtable({
    //   apiKey: process.env.AIRTABLE_API_KEY,
    // }).base(process.env.AIRTABLE_BASE);

    // const familyMembers = await base
    //   .table("guest_list")
    //   .select({
    //     filterByFormula: `family = "${decodedFamilyName}"`,
    //   })
    //   .all();
    // if (!familyMembers?.length) {
    //   return {
    //     statusCode: 404,
    //     body: JSON.stringify({
    //       message: "Family not found",
    //       data: {},
    //     }),
    //   };
    // }
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: "Guest found",
    //     data: {
    //       familyName: decodedFamilyName,
    //       members: familyMembers.map((member) => {
    //         return {
    //           id: member.id,
    //           ...member.fields,
    //         };
    //       }),
    //     },
    //   }),
    // };
  }
  if (event.httpMethod === "PUT") {
    const {data} = JSON.parse(event.body);
    
    const newData = data.map((member) => {
        return {
        id: member?.id || member?.record_id,
        fields: {
            name: member?.name,
            email: member?.email || "",
            phone_number: member?.phone_number || "",
            over_21: member?.over_21 ? "Yes" : "No",
            rsvp: member?.rsvp ? "Yes" : "No",
            notes: member?.notes || "",
            dinner_option: member?.dinner_option || "",
        }
        }
    });
    console.log(newData)
    const updated = await base.table("guest_list").update(newData)
    
    if (updated?.length === 0) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "No family found",
            }),
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Family updated",
            data: updated,
        }),
    }   
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
        }),
    }
  }
};
