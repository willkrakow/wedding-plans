import React from "react";
// import RsvpForm from "../components/rsvpForm";
import Layout, { ClassyCard } from "../components/layout";
import FieldArray from "../components/fieldArray";

const Rsvp = () => (
  <Layout metatitle="RSVP">
    <ClassyCard>
      {/* <RsvpForm /> */}
      <FieldArray />
    </ClassyCard>
  </Layout>
);

export default Rsvp;
