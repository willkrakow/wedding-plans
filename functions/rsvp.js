require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

exports.handler = async function (event) {
  const bod = JSON.parse(event.body);
  console.log(bod);
  const toUpdate = bod.guests.map((guest) => ({
    id: guest.recordId,
    fields: {
      phone_number: guest.phone,
      over_21: guest.over21 ? "Yes" : "No",
      notes: guest.note,
      rsvp: true,
    },
  }));

  console.log(toUpdate);

  const updateOk = base("guest_list").update([...toUpdate], function (err, records) {
    if (err) {
      console.error(err);
      return false;
    }
    return true
  });
if(updateOk){
  return {
    statusCode: 200,
    body: "Form submitted!",
  }
} else {
    return {
      statusCode: 501,
      body: "Internal service error. Form not submitted."
    }
  };
};
