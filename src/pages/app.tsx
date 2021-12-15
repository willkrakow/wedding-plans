import React from "react";
import { Router, globalHistory } from "@reach/router";
import netlifyIdentity, { User } from "netlify-identity-widget";
import Button, { WhiteButton } from "../components/button";
import { Container, Row, Col } from "reactstrap";
import { H2, H4 } from "../components/typography";
import Rsvp from "../components/app/rsvp";
import Survey from "../components/app/survey";
import { navigate } from "gatsby";
import Music from "../components/app/music";
import AccountComponent from "../components/app/account";

interface ILogin {
  path: string;
  user: User | null;
}

const Account = ({ path, user }: ILogin) => {
  React.useEffect(() => {
    if (!user) {
      navigate("/app/login");
    }
  }, [user]);
  return (
    <div>
      USER IS LOGGED IN{" "}
      <Button
        onClick={async () =>
          await netlifyIdentity.logout()?.then(() => navigate("/"))
        }
      >
        Logout
      </Button>
    </div>
  );
};

const Login = ({ path, user }: ILogin) => {
  React.useEffect(() => {
    console.log(user);
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

const AppLanding = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <H4 centered inline={false} alwaysdark>
            RSVP to the wedding, take our survey, and manage your guests.
          </H4>
        </Col>
      </Row>
    </Container>
  );
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [activePath, setActivePath] = React.useState<string>("");

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    navigate(value);
  };
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
    });
    setActivePath(globalHistory.location.pathname);
    if (isBrowser) {
      const user = netlifyIdentity.currentUser();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
      if (!user) {
        navigate("/app/login");
      }
    }
  }, [globalHistory.location.pathname]);

  if (!isBrowser) {
    return null;
  }
  const paths = [
    { path: "/app/home", label: "Home", component: AppLanding },
    { path: "/app/rsvp", label: "RSVP", component: Rsvp },
    { path: "/app/survey", label: "Survey", component: Survey },
    { path: "/app/account", label: "Account", component: Account },
    { path: "/app/music", label: "Music", component: Music },
  ];
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          {paths.map((path, i) => {
            if (!isLoggedIn) {
              return null;
            }
            return activePath === path.path ? (
              <Col key={i} className="text-center">
                <Button value={path.path} onClick={handleNavigate}>
                  {path.label}
                </Button>
              </Col>
            ) : (
              <Col key={i}>
                <WhiteButton key={i} value={path.path} onClick={handleNavigate}>
                  {path.label}
                </WhiteButton>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Router basepath="/app">
        {/* @ts-ignore */}
        <Rsvp path="rsvp" />
        {/* @ts-ignore */}
        <Survey path="survey" />
        <AccountComponent path="account" user={user} />
        {/* @ts-ignore */}
        <AppLanding path="home" />
        {/* @ts-ignore */}
        <Music path="music" />
        {!isLoggedIn && isBrowser && <Login path="login" user={user} />}
      </Router>
    </>
  );
};

export default App;
