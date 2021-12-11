import React from "react";
import Button, { WhiteButton } from "../components/button";
import { H2, H4 } from "../components/typography";
import useAuth from "../hooks/useAuth";
import RsvpList from "../components/RsvpList";

const Rsvp = () => {
  const { login, signup, isLoggedIn, user } = useAuth();
  const [ showRsvpList, setShowRsvpList ] = React.useState(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      setShowRsvpList(true);
    }

    return () => {
      setShowRsvpList(false);
    };
  })
  return (
      <>
        <H2 centered>RSVP</H2>
        {showRsvpList && <RsvpList />}
        {!showRsvpList && (
          <>
          <H4 centered inline alwaysdark >Please log in or create an account to RSVP</H4>
          <Button onClick={login}>Log in</Button>
          <WhiteButton onClick={signup}>Create account</WhiteButton>
          </>
        )}
      </>
  )
};

export default Rsvp;
