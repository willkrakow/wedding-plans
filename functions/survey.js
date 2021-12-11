require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});
var Airtable = require("airtable");

exports.handler = async (event, context) => {
    
    const base = new Airtable({
        apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE);

    console.log(base);
    // if (event.httpMethod === "POST") {
    //     const { data } = JSON.parse(event.body);
    //     const res = await base.table("survey_results").create([{
    //         user_id: data.user_id,
    //         name: data.name,
    //         question_id: data.question_id,
    //         answer: data.answer,
    //     }]);

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({
    //             message: "Success",
    //             input: event,
    //             data: res,
    //         }),
    //     }
    // }
    // if (event.httpMethod === "GET") {
    //     const surveyQuestions = await base("survey").select().all();
    //     if (surveyQuestions.length === 0) {
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify({
    //                 message: "No survey questions found",
    //                 input: event,
    //                 data: []
    //             }),
    //         }
    //     }
    //     const data = surveyQuestions.map((record) => {
    //         return {
    //             id: record.id,
    //             ...record.fields,
    //         }
    //     });

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({ message: "Survey results", data }),
    //     };
    // }
}