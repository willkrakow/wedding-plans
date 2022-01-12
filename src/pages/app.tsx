import React from "react";
import { Col, Container, Row } from "reactstrap";
import Button, { RedButton, WhiteButton } from "../components/button";
import { GuestBox } from "../components/RsvpItem/styles";
import { H2, H3, H4, H5, P } from "../components/typography";
import styled from 'styled-components'
const RsvpInput = styled.input`
border-radius: 0;
border: 1px solid ${props => props.theme.colors.muted};
padding: ${props => props.theme.spacing[2]};
font-size: ${props => props.theme.fontSizes[1]};
font-family: ${props => props.theme.fonts.body};
color: ${props => props.theme.colors.text};
background-color: ${props => props.theme.colors.background};
accent-color: ${props => props.theme.colors.accent};
margin: ${props => props.theme.spacing[2]} 0;
`

const RsvpSelect = styled.select`
border-radius: 0;
border: 1px solid ${props => props.theme.colors.muted};
padding: ${props => props.theme.spacing[2]};
font-size: ${props => props.theme.fontSizes[1]};
font-family: ${props => props.theme.fonts.body};
color: ${props => props.theme.colors.text};
background-color: ${props => props.theme.colors.background};
accent-color: ${props => props.theme.colors.accent};
margin: ${props => props.theme.spacing[2]} 0;
`

const RsvpForm = styled.form`
display: flex;
flex-direction: column;
margin: ${props => props.theme.spacing[2]} 0;
`

const isBrowser = () => typeof window !== "undefined";

type Response<T> = {
  data: T;
  message: string;
};

type Rsvp = {
  id: string;
  name: string;
  phone_number: string;
  email?: string;
  notes: string;
  over_21: "Yes" | "No";
  family_id: string;
  meal_preference: "Arepas" | "Pad thai" | "Burger";
};

type Invite = {
  id: string;
  family: string;
  invite_count: number;
};

type InviteResponse = Response<{
  invite: Invite;
  rsvps: Rsvp[];
}>;

type NewRsvp = Omit<Omit<Rsvp, "id">, "family_id">;

const App = () => {
  const [inviteId, setInviteId] = React.useState<string>("");
  const [invite, setInvite] = React.useState<InviteResponse | null>(null);
  const [editing, setEditing] = React.useState<Rsvp | null>(null);

  const inviteIsFull = (invite?: Invite, rsvps?: Rsvp[]) => {
    if (!invite || !rsvps) {
      return true;
    }
    console.log(invite.invite_count, rsvps.length);
    return invite.invite_count > rsvps.length;
  };
  const getInvite = React.useCallback(async () => {
    const res = await fetch(`/.netlify/functions/rsvps?inviteId=${inviteId}`);
    const data = await res.json();
    console.log(data);
    setInvite(data);
  }, [inviteId]);

  const getInviteId = React.useCallback(() => {
    // Check local storage for the invite ID
    const localId = window.localStorage.getItem("inviteId");
    if (localId) {
      setInviteId(localId);
      return;
    }

    // If not, check the url and then set the invite ID
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get("inviteId");

    if (paramId) {
      window.localStorage.setItem("inviteId", paramId);
      setInviteId(paramId);
    }
  }, []);

  const handleDelete = async (id: string) => {
    await fetch("/.netlify/functions/rsvps", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    await getInvite();
  };

  const handleEdit = async (id: string, rsvp: NewRsvp) => {
    await fetch("/.netlify/functions/rsvps", {
      method: "PUT",
      body: JSON.stringify({ id, ...rsvp }),
    });
    await getInvite();
    setEditing(null);
  };
  const handleAdd = async (rsvp: NewRsvp) => {
    await fetch("/.netlify/functions/rsvps", {
      method: "POST",
      body: JSON.stringify({
        family_id: invite?.data.invite.id,
        ...rsvp,
      }),
    });
    await getInvite();
  };

  React.useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    if (!inviteId) {
      getInviteId();
      return;
    }

    getInvite();
  }, [getInviteId, getInvite, inviteId]);

  if (!isBrowser()) {
    return null;
  }
  return (
    <div>
      <H2 centered>RSVP</H2>
      {invite && (
        <>
          <H4 centered alwaysdark inline>
            Hi {invite.data.invite.family} family!
          </H4>
          <H5 centered>
            {invite.data.rsvps.length} / {invite.data.invite.invite_count}{" "}
          </H5>
          <P centered>RSVPs completed</P>
        </>
      )}
      <Container>
        <Row>
          {invite?.data.rsvps &&
            invite?.data.rsvps.map((rsvp) => (
              <Col className="my-2" xs={12} md={6} key={rsvp.id}>
                <GuestBox>
                  <H3 centered={false}>{rsvp.name}</H3>
                  <P className="mb-1">
                    <span className="text-muted">Email address</span>
                    <br />
                    {rsvp.email || "Not provided"}
                  </P>
                  <P className="mb-1">
                    <span className="text-muted">Phone number</span>
                    <br />
                    {rsvp.phone_number || "Not provided"}
                  </P>
                  <P className="mb-1">
                    <span className="text-muted">Notes</span>
                    <br />
                    {rsvp.notes || "n/a"}
                  </P>
                  <P className="mb-1">
                    <span className="text-muted">Meal choice</span>
                    <br />
                    {rsvp.meal_preference || "None"}
                  </P>
                  <P className="mb-1">
                    <span className="text-muted">Over 21?</span>
                    <br />
                    {rsvp.over_21}
                  </P>
                  <div>
                    <Button onClick={() => setEditing(rsvp)}>Edit</Button>
                    <RedButton onClick={async () => handleDelete(rsvp.id)}>
                      Delete
                    </RedButton>
                  </div>
                </GuestBox>
              </Col>
            ))}
        </Row>
        <Row>
          <Col>
            {inviteIsFull(invite?.data.invite, invite?.data.rsvps) ? (
              <AddForm handleAdd={handleAdd}></AddForm>
            ) : (
              <H3 className="my-4" centered>You've added all your guests!</H3>
            )}
          </Col>
        </Row>
      </Container>

      {editing && (
        <EditForm
          editing={editing}
          handleEdit={handleEdit}
          handleCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
};

export default App;

interface IAddForm {
  handleAdd: (rsvp: NewRsvp) => void;
}
const AddForm = ({ handleAdd }: IAddForm) => {
  const [formData, setFormData] = React.useState<NewRsvp>({
    name: "",
    phone_number: "",
    notes: "",
    over_21: "Yes",
    meal_preference: "Arepas",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd(formData);
    setFormData({
      name: "",
      phone_number: "",
      email: "",
      meal_preference: "Arepas",
      notes: "",
      over_21: "Yes",
    });
  };
  return (
    <GuestBox>
    <RsvpForm onSubmit={handleSubmit}>
      <H3 centered>Add guest</H3>
      <RsvpInput
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <RsvpInput
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        onChange={handleChange}
      />

      <RsvpInput
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <RsvpInput
        type="text"
        name="notes"
        placeholder="Notes"
        onChange={handleChange}
      />

      <RsvpSelect name="over_21" onChange={handleChange}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </RsvpSelect>
      <RsvpSelect name="meal_preference" onChange={handleChange}>
        <option value="Arepas">Arepas</option>
        <option value="Burger">Burger</option>
        <option value="Pad thai">Pad thai</option>
      </RsvpSelect>

      <Button type="submit">Add</Button>
    </RsvpForm>
    </GuestBox>
  );
};

interface IEditForm {
  handleEdit: (id: string, rsvp: NewRsvp) => void;
  handleCancel: () => void;
  editing: Rsvp;
}
const EditForm = ({ editing, handleCancel, handleEdit }: IEditForm) => {
  const [formData, setFormData] = React.useState<NewRsvp>({
    ...editing,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit(editing.id, formData);
    setFormData({
      ...editing,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <RsvpInput
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
            />
          </Col>
          <Col>
            <RsvpInput
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
          </Col>
          <Col>
            <RsvpInput
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              onChange={handleChange}
              value={formData.phone_number}
            />
          </Col>
          <Col>
            <RsvpInput
              type="text"
              name="notes"
              placeholder="Notes"
              onChange={handleChange}
              value={formData.notes}
            />
          </Col>
          <Col>
            <RsvpSelect
              name="over_21"
              onChange={handleChange}
              value={formData.over_21}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </RsvpSelect>
          </Col>
          <Col>
            <RsvpSelect
              name="meal_preference"
              onChange={handleChange}
              value={formData.meal_preference}
            >
              <option value="Arepas">Arepas</option>
              <option value="Pad thai">Pad thai</option>
              <option value="Burger">Burger</option>
            </RsvpSelect>
          </Col>
          <Col>
            <WhiteButton type="button" onClick={handleCancel}>
              Cancel
            </WhiteButton>
            <Button type="submit">Save</Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};
