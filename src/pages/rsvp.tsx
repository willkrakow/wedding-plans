import React from "react";
import Button, { RedButton, WhiteButton } from "../components/button";
import { Input } from "../components/forms";
import { v4 } from "uuid";
import { H2, H4, P } from "../components/typography";
import { Col, Container, Label, Row, Spinner } from "reactstrap";
import styled from "styled-components";
import { navigate } from "gatsby";
type Guest = {
  first_name: string;
  last_name: string;
  age: number;
  attending: boolean;
  phone_number: string;
  email: string;
  id: string;
  notes: string;
  dietary_restrictions: string;
  saved: boolean;
};

const InputLabel = styled(Label)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes[1]};
`;

export const TextArea = styled.textarea`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes[1]};
  border-radius: 0;
  border: 1px solid ${(props) => props.theme.colors.muted};
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: auto;
`;

const isBrowser = typeof window !== "undefined";
const Rsvp = () => {
  const [guests, setGuests] = React.useState<Guest[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
  const handleAddGuest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newGuest = {
      first_name: "",
      last_name: "",
      age: 0,
      attending: true,
      phone_number: "",
      email: "",
      id: v4(),
      notes: "",
      dietary_restrictions: "",
      saved: false,
    };
    setGuests([...guests, newGuest]);
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  const handleChange = (id: string, key: string, value: string | number) => {
    setGuests(
      guests.map((guest) => {
        if (guest.id === id) {
          guest[key] = value;
        }
        return guest;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (guests.length === 0) {
        setErrors([...errors, "You must add at least one guest."]);
        return;
      }
      if (guests.some((guest) => guest.saved === false)) {
        setErrors([...errors, "Dont forget to save your guests!"]);
        setLoading(false);
        return;
      }
      const res = await fetch("/.netlify/functions/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          guests,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        navigate("/thank-you", {
          state: {
            data,
          },
        });
      } else {
        setErrors([...errors, res.statusText]);
        setLoading(false);
      }
    } catch (err) {
        console.log(err)
      setErrors([...errors, "Error submitting form."]);
      setLoading(false);
    }
  };

  const validateGuest = (guestData: any) => {
    if (!guestData.first_name) {
      return "First name is required";
    }
    if (!guestData.last_name) {
      return "Last name is required";
    }
    if (!guestData.age) {
      return "Age is required";
    }
    return "";
  };
  const handleSave = (id: string) => {
    setGuests(
      guests.map((guest) => {
        const validation = validateGuest(guest);
        setErrors([validation]);
        if (guest.id === id && validation.length === 0) {
          return {
            ...guest,
            saved: !guest.saved,
          };
        }
        return guest;
      })
    );
  };

  React.useEffect(() => {
    setCanSubmit(guests.length > 0 && errors.length === 0);
  }, [guests, errors]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <H2 centered>RSVP</H2>
          </Col>
        </Row>
      </Container>
      <FormWrapper onSubmit={handleSubmit} className="mb-5">
        {guests.map((guest) => (
          <>
            {guest.saved ? (
              <SavedGuest key={guest.id} onClick={handleSave} guest={guest} />
            ) : (
              <Container key={guest.id}>
                <Row>
                  <Col xs={12} md={6}>
                    <InputLabel>First name</InputLabel>
                    <Input
                      className="w-100"
                      type="text"
                      name="first_name"
                      placeholder="Jay"
                      required
                      value={guest.first_name}
                      onChange={(e) =>
                        handleChange(guest.id, e.target.name, e.target.value)
                      }
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <InputLabel>Last name</InputLabel>
                    <Input
                      className="w-100"
                      type="text"
                      name="last_name"
                      required
                      placeholder="Gatsby"
                      value={guest.last_name}
                      onChange={(e) =>
                        handleChange(guest.id, e.target.name, e.target.value)
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <InputLabel>Email address</InputLabel>
                    <Input
                      className="w-100"
                      type="email"
                      name="email"
                      placeholder="jaygee@example.com"
                      value={guest.email}
                      onChange={(e) =>
                        handleChange(guest.id, e.target.name, e.target.value)
                      }
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <InputLabel>Phone number</InputLabel>
                    <Input
                      className="w-100"
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      name="phone_number"
                      required={guest.phone_number.length > 0}
                      placeholder="919-555-5555"
                      value={guest.phone_number}
                      onChange={(e) =>
                        handleChange(guest.id, e.target.name, e.target.value)
                      }
                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputLabel>Age</InputLabel>
                    <Input
                      className="w-100"
                      type="number"
                      name="age"
                      required
                      placeholder="34"
                      value={guest.age}
                      onChange={(e) =>
                        handleChange(guest.id, e.target.name, e.target.value)
                      }
                    />
                  </Col>
                  <Col xs={12} md={9}>
                    <InputLabel>Dietary restrictions</InputLabel>
                    <Input
                      className="w-100"
                      value={guest.dietary_restrictions}
                      name="dietary_restrictions"
                      placeholder="Vegan, vegetarian, etc."
                      onChange={(e) =>
                        handleChange(guest.id, e.target.name, e.target.value)
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputLabel>Notes</InputLabel>
                    <TextArea
                      className="w-100 p-2"
                      value={guest.notes}
                      name="notes"
                      placeholder="And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer."
                      rows={4}
                      onChange={(e) =>
                        handleChange(guest.id, e.target.name, e.target.value)
                      }
                    ></TextArea>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSave(guest.id);
                      }}
                    >
                      Save guest
                    </Button>
                    <RedButton onClick={() => handleRemoveGuest(guest.id)}>
                      Remove {guest.first_name || "guest"}
                    </RedButton>
                    <P>
                      {errors &&
                        errors.map((e) => (
                          <span className="text-danger">{e}</span>
                        ))}
                    </P>
                  </Col>
                </Row>
              </Container>
            )}
          </>
        ))}
        <Container className="mt-3">
          <Row>
            <Col className="d-flex flex-column">
              <WhiteButton onClick={handleAddGuest}>+ Add guest</WhiteButton>
            </Col>
            <Col className="d-flex flex-column">
              <Button type="submit">
                {(isBrowser && loading) && <Spinner />}
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </FormWrapper>
    </>
  );
};

export default Rsvp;

const SavedGuest = ({
  guest,
  onClick,
}: {
  guest: Guest;
  onClick: (id: string) => void;
}) => (
  <Container className="border border-muted py-3">
    <Row>
      <Col xs={1} md={1}>
        ✅
      </Col>
      <Col xs={7} md={9}>
        <H4 centered={false} inline alwaysdark className="mb-0">
          {guest.first_name} {guest.last_name} {`(${guest.age})`}
        </H4>
      </Col>
      <Col xs={3} md={2}>
        <Button className="py-0" onClick={() => onClick(guest.id)}>
          Edit
        </Button>
      </Col>
    </Row>
    {(guest.email || guest.phone_number) && (
      <Row>
        <Col xs={1} md={1}></Col>
        <Col xs={7} md={9}>
          {guest.email && <P className="mb-1">{guest.email}</P>}
          {guest.phone_number && <P className="mb-1">{guest.phone_number}</P>}
        </Col>
      </Row>
    )}
    {(guest.dietary_restrictions || guest.notes) && (
      <Row>
        <Col xs={1} md={1}></Col>
        <Col>
          {guest.dietary_restrictions && (
            <P className="mb-1">{guest.dietary_restrictions}</P>
          )}
          {guest.notes && (
            <P className="mb-1">
              <em>{guest.notes}</em>
            </P>
          )}
        </Col>
      </Row>
    )}
  </Container>
);
