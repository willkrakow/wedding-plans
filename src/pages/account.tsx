import React from "react";
import { Col, Container, Row } from "reactstrap";
import useAuth from "../hooks/useAuth";
import { H3, H4 } from "../components/typography";
import Button, { RedButton, WhiteButton } from "../components/button";
import RsvpList from "../components/RsvpList";
import { FancyInput } from "../components/RsvpList/styles";

interface TempUserMetadata {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

const Account = () => {
    const [ displayAccount, setDisplayAccount ] = React.useState(false);
    const {
      user,
      updateUser,
      login,
      signup,
      requestPasswordRecovery,
      isLoggedIn,
      logout,
    } = useAuth();
    const [ newValues, setNewValues ] = React.useState<TempUserMetadata | null>(user?.user_metadata);
  

  React.useEffect(() => {
    if (!isLoggedIn || !user) {
      login();
      return
    }

    setDisplayAccount(isLoggedIn);
    setNewValues(user?.user_metadata);
    }, [isLoggedIn, user]);

  const handleSave = () => {
    updateUser({
      name: newValues?.name,
      email: newValues?.email,
      phone: newValues?.phone,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setNewValues({...newValues, email: value});
    }
    if (name === "name") {
      setNewValues({ ...newValues, name: value});
    }

    if (name === "phone_number") {
      setNewValues({ ...newValues, phone: value});
    }
  }

  return displayAccount ? (
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
            value={newValues?.email}
            onChange={handleChange}
          />
        </Col>
        <Col>
          {/* @ts-ignore */}
          <H4 inline>Name</H4>
          <FancyInput
            type="text"
            value={newValues?.name}
            onChange={handleChange}
          />
        </Col>
        <Col>
          {/* @ts-ignore */}
          <H4 inline>Phone</H4>
          <FancyInput
            type="text"
            value={newValues?.phone}
            onChange={handleChange}
          />
        </Col>
        <Col>
          {/* @ts-ignore */}
          <H4 inline>Password</H4>
          <WhiteButton
            onClick={() => user?.email && requestPasswordRecovery(user?.email)}
          >
            Change password
          </WhiteButton>
        </Col>
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
}

export default Account