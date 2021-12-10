import React from "react";
import Button, { WhiteButton } from "../components/button";
import { H2, H4 } from "../components/typography";
import useAuth from "../hooks/useAuth";
import RsvpList from "../components/RsvpList";

const Rsvp = () => {
  const { login, signup, isLoggedIn, user } = useAuth();
  return (
      <>
        <H2 centered>RSVP</H2>
        {isLoggedIn && user && <RsvpList />}
        {!isLoggedIn && (
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
