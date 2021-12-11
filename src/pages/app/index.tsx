import React from "react";
import { Router, globalHistory } from "@reach/router";
import { navigate } from "gatsby";
import PrivateRoute from "../../components/privateRoute";
import Account from "./account";
import netlifyIdentity from "netlify-identity-widget";
import Button, { WhiteButton } from "../../components/button";
import RsvpList from "../../components/RsvpList";
import { Container, Row, Col } from "reactstrap";
import { H2, H4 } from '../../components/typography';
import Rsvp from './rsvp'

interface ILogin {
  path: string;
}

const Login = ({ path }: ILogin) => {
  React.useEffect(() => {
    if (netlifyIdentity.currentUser()) {
      navigate("/app/account");
    }
  }, []);

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
        <Col xs={12} md={6} lg={3} className="d-flex flex-column mb-4 justify-content-center">
          <Button onClick={() => netlifyIdentity.open()}>Login</Button>
        </Col>
        <Col xs={12} md={6} lg={3} className="d-flex flex-column justify-content-center">
          <WhiteButton onClick={() => netlifyIdentity.logout()}>
            Signup
          </WhiteButton>
        </Col>
      </Row>
    </Container>
  );
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setIsLoggedIn(true);
      navigate("/app/account");
    });

    netlifyIdentity.on("logout", () => {
      setIsLoggedIn(false);
      navigate("/");
    });
  });
  return (
    <Router basepath="/app">
      <PrivateRoute
        path="/account"
        location={globalHistory.location}
        component={Account}
      />
      <PrivateRoute
        path="/rsvp"
        location={globalHistory.location}
        component={Rsvp}
      />
      {!isLoggedIn && <Login path="/login" />}
    </Router>
  );
};

export default App;
