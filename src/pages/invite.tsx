import React from "react";
import { Row, Col } from "reactstrap";
import Button from "../components/button";
import { H2, H4 } from "../components/typography";
import RsvpItemForm from "../components/RsvpItem";
import styled from "styled-components";
import Music from "../components/app/music";
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

interface IModalMessage {
  show: boolean;
}
const ModalMessage = styled.div<IModalMessage>`
  position: fixed;
  inset: 30vh 20vw;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 0 0 10vw 100vw rgba(0, 0, 0, 0.2);
`;

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

  const updateGuests = async (updatedData) => {
    if (!updatedData?.length) {
      return;
    }
    const res = await fetch(`/.netlify/functions/guests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [...updatedData] }),
    });

    if (!res?.ok) {
      return guestData;
    }
    const data = await res.json();
    return data;
  };

  const handleSubmit = (newData: any, id?: string) => {
    const updatedData = guestData.map((guest: any) => {
      if (guest.id === id) {
        return { ...guest, ...newData };
      }
      return guest;
    });

    updateGuests(updatedData)
      .then((data) => {
        setGuestData(data.data);
        setMessage("Saved!");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error saving data");
      });
  };

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
      <Row>
        <Col>
          {guestData && guestData.length > 0 && (
            <H4 centered inline={false} alwaysdark>
              Welcome {guestData[0].fields.family[0]} family!
            </H4>
          )}
        </Col>
      </Row>
      <Row>
        {guestData &&
          guestData?.map((member) => (
            <Col
              xs={12}
              md={6}
              lg={4}
              className="mb-5"
              key={member.fields.record_id}
            >
              <RsvpItemForm
                data={{ id: member.fields.record_id, ...member.fields }}
                onSubmit={handleSubmit}
                onCancel={() => setGuestData(guestData)}
              />
            </Col>
          ))}
      </Row>
      <ModalMessage show={message.length > 0}>
        <H4 centered alwaysdark inline={false}>
          {message}
        </H4>
        <Button onClick={() => setMessage("")}>Close</Button>
      </ModalMessage>
    </ClassyCard>
  );
};

export default Invite;
