import React from "react";
import { Row, Col } from "reactstrap";
import { H2, H4 } from "../components/typography";
import Music from "../components/music";
import { isBrowser } from '../utils'
import { ClassyCard } from "../containers/classyCard";

type FamilyMember = {
  id: string;
  fields: {
    name: string;
    rsvp: string;
    familyName?: string;
    over_21: boolean;
    email: string;
    phone_number: string;
    record_id: string;
    family: string[];
  };
};

type FamilyResponse = {
  message: string;
  data: FamilyMember[];
};



const Invite = () => {
  const [guestData, setGuestData] = React.useState<FamilyMember[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    const getQueryString = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("familyName") || null;
    };
    const getGuestId = async () => {
      setLoading(true);
      const familyName = getQueryString();
      if (!familyName) {
        setGuestData([]);
        setLoading(false);
        return
      }
      const res = await fetch(
        `/.netlify/functions/guests?familyName=${encodeURIComponent(
          familyName
        )}`
      );
      if (!res?.ok) {
        setGuestData([]);
        setMessage("Error loading guests");
        setLoading(false);
        return;
      }
      res
      .json()
      .then((data: FamilyResponse) => {
        setMessage("Family found!");
        setGuestData(data.data);
        setLoading(false)
      })
      .catch((err) => {
        setMessage("Error loading guests");
        console.error(err)
        setGuestData([]);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false)});
      };
    getGuestId();
  }, []);

  if (!isBrowser) {
    return null;
  }

  if (loading) {
    return (
      <ClassyCard>
        <Row className="justify-content-center">
          <Col xs={12}>
            <H4 centered inline={false} alwaysdark>
              Loading...
            </H4>
            {message && <H4 centered inline={false} alwaysdark>
              {message}
            </H4>}
          </Col>
        </Row>
      </ClassyCard>
    );
  }

  if (!loading && guestData.length === 0) {
    return (
      <ClassyCard>
        <Row>
          <Col>
            <H2 centered>RSVP</H2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12}>
            <H4 centered inline={false} alwaysdark>
              Coming soon! In the meantime, feel free to suggest some songs for
              the reception.
            </H4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Music />
          </Col>
        </Row>
      </ClassyCard>
    );
  }

  return (
    <ClassyCard>
      <Row>
        <Col>
          <H2 centered>RSVP</H2>
        </Col>
      </Row>
    </ClassyCard>
  );
};

export default Invite;
