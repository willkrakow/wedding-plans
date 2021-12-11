import React from "react";
import { Row, Col } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import Button, { WhiteButton } from "../button";
import RsvpItemForm from "../RsvpItem";
import useAirtable from "../../hooks/useAirtable";
import { ErrorMessage, FullHeightContainer, GuestBox } from "../RsvpItem/styles";
import RsvpCard from "../RsvpItem/rsvpCard";


const RsvpList = () => {
  const [editing, setEditing] = React.useState<null | string>(null);
  const [creating, setCreating] = React.useState(false);
  
  const { user } = useAuth();

  const { data, errors, loading, updateData, addData, deleteData } =
    useAirtable(user?.id);

  const handleEdit = (id: string) => {
    setEditing(id);
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const handleAddSelf = () => {
    return addData({
      name: user?.user_metadata?.full_name,
      email: user?.email || "",
      over21: false,
      notes: "",
      user_account_id: user?.id || "",
      phone_number: "",
      is_account_owner: true,
    });
  };

  const accountOwnerInData = (data) => data.some(
    (item) => item?.user_account_id === user?.id && item.is_account_owner
  );

  const handleUpdateData = (newData: any, id?: string) => {
    updateData(newData, id)
    .then(() => {
      setEditing(null);
    })
  }

  return (
    <Row>
      {!loading ? (
        <>
          {data.map((item) => {
            return (
              <Col key={item.id} xs={12} md={6} lg={3}>
                <GuestBox>
                  {editing && item.id && editing === item.id ? (
                    <RsvpItemForm
                      data={{ ...item, email: user?.email || "", name: user?.user_metadata?.full_name, phone: user?.user_metadata?.phone_number || user?.user_metadata?.phone || ""}}
                      onSubmit={handleUpdateData}
                      onPostSubmit={() => setEditing(null)}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <RsvpCard item={item} onDelete={deleteData} handleEdit={handleEdit} />
                  )}
                </GuestBox>
              </Col>
            );
          })}
          <Col xs={12} md={6} lg={3}>
            <GuestBox>
              {creating ? (
                <>
                  <RsvpItemForm
                    onSubmit={addData}
                    onPostSubmit={() => setCreating(false)}
                    onCancel={() => setCreating(false)}
                  />
                  {errors.length > 0 && (
                    <div>
                      {errors.map((error, index) => (
                        <ErrorMessage key={index}>{error}</ErrorMessage>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <FullHeightContainer className="align-items-center justify-content-center d-flex">
                  <Button onClick={() => setCreating(true)}>Add guest</Button>
                  {!accountOwnerInData(data) && (
                    <WhiteButton onClick={handleAddSelf}>
                      Add myself
                    </WhiteButton>
                  )}
                </FullHeightContainer>
              )}
            </GuestBox>
          </Col>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </Row>
  );
};

export default RsvpList;
