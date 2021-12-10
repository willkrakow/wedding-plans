import React from "react";
import { Col, Container, Row } from "reactstrap";
import useAuth from "../hooks/useAuth";
import { H3, H4 } from "../components/typography";
import Button, { RedButton, WhiteButton } from "../components/button";
import RsvpList from "../components/RsvpList";
import { FancyInput } from "../components/RsvpList/styles";
import { User } from "netlify-identity-widget";
import { UserData } from "gotrue-js";

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
    requestPasswordRecovery,
    isLoggedIn,
    logout,
  } = useAuth();
  const [newValues, setNewValues] = React.useState<User | any>(
    extractUserMetadata(user)
  );

  React.useEffect(() => {
    const currentUserValues = extractUserMetadata(user);
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
  return isLoggedIn ? (
    <Container>
      <Row>
        <Col>
          {/* @ts-ignore */}
          <H3>Account</H3>
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
            {stale && <Button className="mt-2" type="submit">
              Save
            </Button>}
          </Col>
        </Row>
        <Row>
          <Col>
            {/* @ts-ignore */}
            <H4 inline>Security</H4>
            <WhiteButton
              onClick={() =>
                user?.email && requestPasswordRecovery(user?.email)
              }
            >
              Change password
            </WhiteButton>
          </Col>
          </Row>
          <Row>
          <Col>
            {/* @ts-ignore */}
            <H4 inline></H4>
            <RedButton onClick={logout}>Log out</RedButton>
          </Col>
        </Row>
      </form>
      <Row className="mt-5">
        <Col xs={12}>
          <H3>RSVPs</H3>
        </Col>
      </Row>
      <RsvpList />
    </Container>
  ) : (
    <Container>
      <Row>
        <Col>
          <H3>Account</H3>
        </Col>
      </Row>
      <Row>
        <Col>
          <H4 centered={false} inline={false} alwaysdark={true}>
            Please login or create an account to continue
          </H4>
          <Button onClick={login}>Log in</Button>
          <WhiteButton onClick={signup}>Create account</WhiteButton>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
