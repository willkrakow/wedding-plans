import React from "react";
import Button, { RedButton, WhiteButton } from "../components/button";
import FieldArray from "../components/fieldArray";
import { H2, H4 } from "../components/typography";
import useAuth from "../hooks/useAuth";

const Rsvp = () => {
  const { login, logout, signup, isLoggedIn, isConfirmedUser } = useAuth();
  return (
      <>
        <H2 centered>RSVP</H2>
        {isLoggedIn && isConfirmedUser && (
          <>
        <FieldArray />
        <RedButton onClick={logout}>Log out</RedButton>
        </>
        )}
        {isLoggedIn && !isConfirmedUser && (
          <>
            <H4 centered inline alwaysdark>You must confirm your email address before you can RSVP.</H4>
            <WhiteButton onClick={logout}>Log out</WhiteButton>
          </>
        )}
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
