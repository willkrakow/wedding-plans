import React from "react";
import { Col, Container, Row } from "reactstrap";
import { H2, H4 } from "../../components/typography";
import Button, { RedButton, WhiteButton } from "../../components/button";
import { FancyInput } from "../../components/RsvpList/styles";
import { User } from "netlify-identity-widget";
import { NetlifyAuthContext } from "../../contexts/netlifyAuth";
import { UserData } from "gotrue-js";
import netlifyIdentity from "netlify-identity-widget";
import { navigate } from 'gatsby'

function extractUserMetadata(user?: UserData | User | null) {
  if (!user) return {};
  return {
    ...user,
    full_name: user?.user_metadata?.full_name,
    email: user?.email,
    phone: user?.user_metadata?.phone,
  };
}

interface Props {
  path: string;
  user: User | null;
  isLoggedIn: boolean;
}

const Account = ({path, user}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [stale, setStale] = React.useState(false);
  const { updateUserData, requestPasswordReset } =
    React.useContext(NetlifyAuthContext);
  const [newValues, setNewValues] = React.useState<User | any>(
    extractUserMetadata(user)
  );

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
    const { name, value } = e.target;
    setNewValues({ ...newValues, [name]: value });
    setStale(true);
  };

  const handleLogout = () => {
    netlifyIdentity.logout()?.then(() => navigate("/app/login"));
  };

  if (loading) {
    return (
      <H4 centered alwaysdark inline={false}>
        Loading...
      </H4>
    );
  }
  return (
    <Container>
      <Row className="justify-content-center mb-2">
        <Col className="text-center">
          {/* @ts-ignore */}
          <H2 centered>Account</H2>
        </Col>
      </Row>
      <form onSubmit={handleSave}>
        <Row className="mt-3">
          <Col xs={12} md={6} lg={4} className="mb-4">
            {/* @ts-ignore */}
            <H4 inline>Email address</H4>
            <FancyInput
              type="text"
              name="email"
              value={newValues?.email}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            {/* @ts-ignore */}
            <H4 inline>Name</H4>
            <FancyInput
              type="text"
              name="full_name"
              value={newValues?.full_name}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            {/* @ts-ignore */}
            <H4 inline>Phone</H4>
            <FancyInput
              type="text"
              value={newValues?.phone}
              name="phone"
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            {/* @ts-ignore */}
            <H4 inline></H4>
            <Button className="mt-2" type="submit" disabled={!stale}>
              Save
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <H4 inline centered={false} alwaysdark></H4>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <RedButton onClick={handleLogout}>Log out</RedButton>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <WhiteButton
              onClick={() => user?.email && requestPasswordReset(user?.email)}
            >
              Change password
            </WhiteButton>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default Account;
