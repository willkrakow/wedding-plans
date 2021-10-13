require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

exports.handler = async function (event) {
  const formBody = JSON.parse(event.body);

  const toUpdate = formBody.test.map((guest) => ({
    fields: {
      name: guest.name,
      phone_number: guest.phoneNumber,
      over_21: guest.over21 ? "Yes" : "No",
      notes: guest.notes,
      rsvp: "Yes",
    },
  }));




  base('rsvps').create([...toUpdate], (err, records) => {
    if (err) {
      console.log("Something went wrong")
      console.log(err);
      return false
    }
    records.forEach((record) => {
      console.log("All went right")
      console.log(record.getId())
    })
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Form submitted"
    })
  }
};
