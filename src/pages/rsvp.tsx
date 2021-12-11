import React from "react";
import Button, { WhiteButton } from "../components/button";
import { H2, H4 } from "../components/typography";
import RsvpList from "../components/RsvpList";
import { NetlifyAuthContext } from "../contexts/netlifyAuth";
import { Col, Container, Row } from "reactstrap";
import netlifyIdentity from "netlify-identity-widget";

const Rsvp = () => {
  const { login, signup, isLoggedIn, user } = React.useContext(NetlifyAuthContext);
  const [ showRsvpList, setShowRsvpList ] = React.useState(false);

  React.useEffect(() => {
    const things = JSON.parse(localStorage.getItem("gotrue.user") || "{}");
    if (things?.user_metadata) {
      setShowRsvpList(true);
    }
  }, []);

  return (
    <>
      <H2 centered>RSVP</H2>
      {showRsvpList && <RsvpList />}
      {!showRsvpList && (
        <Container>
          <Row className="justify-content-center mb-4">
            <Col xs={12} className="mb-3">
              <H4 centered inline alwaysdark>
                Please log in or create an account to RSVP
              </H4>
            </Col>
            <Col xs={12} md={6} lg={3} className="d-flex justify-content-between">
              <Button onClick={login}>Log in</Button>
              <WhiteButton onClick={signup}>Create account</WhiteButton>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Rsvp;
