import React from "react";
import { RsvpRecord } from "../components/fieldArray";

export default function useAirtable(userId?: string) {
  const [data, setData] = React.useState<RsvpRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState<string[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!userId) {
        setLoading(false);
        setErrors(["No userId"]);
        return;
    }
      const res = await fetch(`/.netlify/functions/rsvp?id=${userId}`);

      _handleErrors(res, "Failed to fetch data");

      const json = await res.json();
      setData(json.data);
    };

    fetchData().then(() => setLoading(false));

    return () => {
        setErrors([]);
    };
  }, [userId]);

  const _handleErrors = (res: Response, message: string) => {
    switch (res.status) {
      case 401:
        setErrors(["Unauthorized", message]);
        break;
      case 404:
        setErrors(["Not found", message]);
        break;
      case 500:
        setErrors(["Internal server error", message]);
        break;
      case 503:
        setErrors(["Service unavailable", message]);
        break;
      default:
        setErrors([]);
        break;
    }
  };

  const addData = async (newItem: RsvpRecord) => {
    setLoading(true);
    const res = await fetch(`/.netlify/functions/rsvp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...newItem, user_account_id: userId}),
    });

    _handleErrors(res, "Failed to add data");

    const json = await res.json();
    const newData = [...data, json.data];
    setData(newData);
    setLoading(false);
  };

  const updateData = async (updatedItem: RsvpRecord, id?: string) => {
    setLoading(true);
    if(!id) {
        setLoading(false);
        setErrors(["No id"]);
        return;
    }
    const res = await fetch(`/.netlify/functions/rsvp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        data: updatedItem,
      }),
    });

    _handleErrors(res, "Failed to update data");

    const json = await res.json();
    const newData = data.map((d: RsvpRecord) => {
      if (d.id === id) {
        return {
          ...d,
          ...json.data,
        };
      }
      return d;
    });
    setData(newData);
    setLoading(false);
  };

  const deleteData = async (id: string) => {
    const res = await fetch(`/.netlify/functions/rsvp`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    _handleErrors(res, "Failed to delete data");
    const json = await res.json();
    const newData = data.filter((d: RsvpRecord) => d.id !== json.id);
    setData(newData);
    setLoading(false);
  };

  return {
    data,
    loading,
    errors,
    addData,
    updateData,
    deleteData,
  };
}
