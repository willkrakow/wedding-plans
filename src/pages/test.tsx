import React from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";
import Button from "../components/button";

const Test = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      console.log("User logged in", user);
    });
  }, []);

  const onClickLogin = () => {
    netlifyIdentity.open("login");
  };

  const onClickLogout = () => {
    netlifyIdentity.logout();
  };

  const onClickSignup = () => {
    netlifyIdentity.open("signup");
  };

  return (
    <div>
      {user
      ? <Button onClick={onClickLogout}>Logout</Button>
      : (
        <>
          <Button onClick={onClickLogin}>Login</Button>
          <Button onClick={onClickSignup}>Signup</Button>
        </>
      )}
      {user && <p>{user.email}</p>}
    </div>
  );
};

export default Test;
