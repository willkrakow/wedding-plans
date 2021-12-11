import React from "react";
import { Col, Container, Row } from "reactstrap";
import { H2, H3, H4 } from "../components/typography";
import Button, { WhiteButton } from "../components/button";
import RsvpList from "../components/RsvpList";
import { FancyInput } from "../components/RsvpList/styles";
import { User } from "netlify-identity-widget";
import { UserData } from "gotrue-js";
import { NetlifyAuthContext } from "../contexts/netlifyAuth";
import netlifyIdentity from "netlify-identity-widget";

function extractUserMetadata(user?: UserData | User | null) {
  if (!user) return {};
  return {
    ...user,
    full_name: user?.user_metadata?.full_name,
    email: user?.email,
    phone: user?.user_metadata?.phone,
  };
}

const Account = () => {
  const [loading, setLoading] = React.useState(false);
  const [ stale, setStale ] = React.useState(false);
  const {
    user,
    updateUserData,
    login,
    signup,
    requestPasswordReset,
  } = React.useContext(NetlifyAuthContext);
  const [newValues, setNewValues] = React.useState<User | any>(
    extractUserMetadata(user)
  );
  const [ hackUser, setHackUser ] = React.useState<User | any>()

  React.useEffect(() => {
    const pageLoadUser = netlifyIdentity.currentUser();
    setHackUser(pageLoadUser);
    const currentUserValues = extractUserMetadata(pageLoadUser);
    setNewValues(currentUserValues);
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    updateUserData({
      email: newValues.email,
      data: {
        full_name: newValues.full_name,
        phone: newValues.phone,
      },
    })
      .then((res: UserData | any) => {
        const currentUserValues = extractUserMetadata(res);
        setNewValues(currentUserValues);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setStale(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStale(true);
    const { name, value } = e.target;
    setNewValues({ ...newValues, [name]: value });
  };

  if (loading) {
    return <H4 centered alwaysdark inline={false}>Loading...</H4>;
  }
  return hackUser ? (
    <Container>
      <Row className="justify-content-center mb-2">
        <Col className="text-center">
          {/* @ts-ignore */}
          <H2 centered>Account</H2>
        </Col>
      </Row>
      <form onSubmit={handleSave}>
        <Row className="mt-3">
          <Col>
            {/* @ts-ignore */}
            <H4 inline>Email address</H4>
            <FancyInput
              type="text"
              name="email"
              value={newValues?.email}
              onChange={handleChange}
            />
          </Col>
          <Col>
            {/* @ts-ignore */}
            <H4 inline>Name</H4>
            <FancyInput
              type="text"
              name="full_name"
              value={newValues?.full_name}
              onChange={handleChange}
            />
          </Col>
          <Col>
            {/* @ts-ignore */}
            <H4 inline>Phone</H4>
            <FancyInput
              type="text"
              value={newValues?.phone}
              name="phone"
              onChange={handleChange}
            />
          </Col>
          <Col>
            {/* @ts-ignore */}
            <H4 inline></H4>
            {stale && (
              <Button className="mt-2" type="submit">
                Save
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {/* @ts-ignore */}
            <H4 inline>Security</H4>
            <WhiteButton
              onClick={() => user?.email && requestPasswordReset(user?.email)}
            >
              Change password
            </WhiteButton>
          </Col>
        </Row>
      </form>
      <Row className="mt-5">
        <Col xs={12}>
          <H3>RSVPs</H3>
        </Col>
      </Row>
      {hackUser && <RsvpList />}
    </Container>
  ) : (
    <Container>
      <Row className="mb-4">
        <Col>
          <H2 centered>Account</H2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <H4 centered inline={false} alwaysdark={true}>
            Please login or create an account to continue
          </H4>
        </Col>

        <Col xs={12} md={5} lg={3} className="d-flex justify-content-between">
          <Button onClick={login}>Log in</Button>
          <WhiteButton onClick={signup}>Create account</WhiteButton>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
