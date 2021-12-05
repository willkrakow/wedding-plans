import React from "react";
import { H2, H4 } from "../components/typography";
import HoneymoonResults from "../components/HoneymoonResults";

const ThankYou = () => {

  return (
    <React.Fragment>
      <H2 className="text-center w-100 d-block">
        Thanks for casting your vote!
      </H2>
      {/* @ts-ignore */}
      <H4 centered>Here are the results so far...</H4>
      <HoneymoonResults />
    </React.Fragment>
  );
};

export default ThankYou;
