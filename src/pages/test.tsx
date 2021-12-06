import React from "react";
import Button from "../components/button";
import useAuth from "../hooks/useAuth";
import { } from 'gatsby';

const Test = () => {
  const { login, logout, signup, user } = useAuth()
  return (
    <div>
      {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <>
          <Button onClick={login}>Login</Button>
          <Button onClick={signup}>Signup</Button>
        </>
      )}
      {user && <>{user.email}</>}
    </div>
  );
};

export default Test;
