import React from "react";

const isBrowser = () => typeof window !== "undefined";

type Response<T> = {
  data: T;
  message: string;
}

type Rsvp = {
  id: string;
  name: string;
  phone_number: string;
  email?: string;
  notes: string; 
  over_21: "Yes" | "No";
}

type Invite = {
  id: string;
  family: string;
  invite_count: number;
}

type InviteResponse = Response<{
  invite: Invite;
  rsvps: Rsvp[];
}>

type NewRsvp = Omit<Omit<Rsvp, "id">, "family_id">;

const App = () => {
  const [inviteId, setInviteId] = React.useState<string>("");
  const [invite, setInvite] = React.useState<InviteResponse | null>(null);
  const inviteIsFull = (invite?: Invite, rsvps?: Rsvp[]) => {
    if (!invite || !rsvps) {
      return true
    }
    console.log(invite.invite_count, rsvps.length)
    return invite.invite_count > rsvps.length
  }
  const getInvite = React.useCallback(async () => {
    const res = await fetch(`/.netlify/functions/rsvps?inviteId=${inviteId}`);
    const data = await res.json();
    console.log(data)
    setInvite(data);
  }, [inviteId]);
 
  const getInviteId = React.useCallback(() => {
    // Check local storage for the invite ID
    const localId = window.localStorage.getItem("inviteId");
    if (localId) {
      setInviteId(localId);
      return
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
    await fetch('/.netlify/functions/rsvps', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
    await getInvite();
  }

  const handleAdd = async (rsvp: NewRsvp) => {
    await fetch('/.netlify/functions/rsvps', {
      method: 'POST',
      body: JSON.stringify({
        family_id: invite?.data.invite.id,
        ...rsvp
      }),
    })
    await getInvite();
  }

  React.useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    if (!inviteId) {
      getInviteId();
      return
    }

    getInvite();
  }, [getInviteId, getInvite, inviteId]);

  if (!isBrowser()) {
    return null;
  }
  return (
    <div>
      <h1>RSVP</h1>
      <div>
        {invite && (
          <>
            <h2>Hi {invite.data.invite.family} family!</h2>
            <p>{invite.data.rsvps.length} / {invite.data.invite.invite_count} RSVPs so far</p>
          </>
        )}
      </div>

      <ul>
        {invite?.data.rsvps &&
          invite?.data.rsvps.map((rsvp) => (
            <li key={rsvp.id}>
              <h4>{rsvp.name}</h4>
              <p>
                <strong>Over 21?</strong>
                {rsvp.over_21}
              </p>
              <p>{rsvp.phone_number}</p>
              <p>{rsvp.notes}</p>
              <button onClick={async () => handleDelete(rsvp.id)}>Delete</button>
            </li>
          ))}
      </ul>
      {(inviteIsFull(invite?.data.invite, invite?.data.rsvps)) ? (
      <AddForm handleAdd={handleAdd}></AddForm>
      ) :
      <p>You've added all your guests!</p>}
    </div>
  );
};

export default App;


interface IAddForm {
  handleAdd: (rsvp: NewRsvp) => void;
}
const AddForm = ({handleAdd}: IAddForm) => {
  const [formData, setFormData] = React.useState<NewRsvp>({
    name: "",
    phone_number: "",
    notes: "",
    over_21: "Yes",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      notes: "",
      over_21: "Yes",
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
      <input type="text" name="notes" placeholder="Notes" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  )
}
