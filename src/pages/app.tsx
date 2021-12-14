import React from "react";
import { Router, globalHistory } from "@reach/router";
// import { navigate } from "gatsby";
import PrivateRoute from "../components/privateRoute";
import netlifyIdentity, { User } from "netlify-identity-widget";
import Button, { WhiteButton } from "../components/button";
import { Container, Row, Col } from "reactstrap";
import { H2, H4 } from "../components/typography";
import Rsvp from "../components/app/rsvp";
import Survey from "../components/app/survey";
import { navigate } from "gatsby";
import { GoTrueInit } from "gotrue-js";
interface ILogin {
  path: string;
}

const Account = ({ path }: ILogin) => {
  React.useEffect(() => {
    console.log(netlifyIdentity.currentUser());
  }, []);
  return (
    <div>
      USER IS LOGGED IN{" "}
      <button onClick={async () => await netlifyIdentity.logout()}>
        logout
      </button>
    </div>
  );
};

const Login = ({ path }: ILogin) => {
  return (
    <Container>
      <Row>
        <H2 centered>Account</H2>
      </Row>
      <Row>
        <H4 alwaysdark centered inline={false}>
          Please log in or sign up to continue.
        </H4>
      </Row>
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={6}
          lg={3}
          className="d-flex flex-column mb-4 justify-content-center"
        >
          <Button onClick={() => netlifyIdentity.open()}>Login</Button>
        </Col>
        <Col
          xs={12}
          md={6}
          lg={3}
          className="d-flex flex-column justify-content-center"
        >
          <WhiteButton onClick={async () => await netlifyIdentity.logout()}>
            Signup
          </WhiteButton>
        </Col>
      </Row>
    </Container>
  );
};

interface Account {
  path: string;
  user: User | null;
}

const isBrowser = typeof window !== "undefined";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const handleLogout = async () => {
    await netlifyIdentity.logout();
    setIsLoggedIn(false);
    setUser(null);
    navigate("/app/login");
  };
  React.useEffect(() => {
    netlifyIdentity.on("login", () => {
      setIsLoggedIn(true);
      setUser(netlifyIdentity.currentUser());
      navigate("/app/account")
    });
    if (isBrowser) {
      const user = netlifyIdentity.currentUser();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
      if (!user) {
          navigate('/app/login')
      }
    }
  }, [globalHistory.location.pathname]);

  if (!isBrowser) {
    return null;
  }
  return (
    <>
      <button onClick={() => navigate("/app/account")}>Account</button>
      <button onClick={() => navigate("/app/rsvp")}>RSVP</button>
      <button onClick={() => navigate("/app/survey")}>Survey</button>
      <button onClick={handleLogout}>Logout</button>
        <Router basepath="/app">
            <Account path="account" />
            <Rsvp path="rsvp" />
            <Survey path="survey" />
            <Login path="login" />
        </Router>
      
    </>
  );
};

export default App;
