import React from "react";
import { Row, Col, Container } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { H4, P } from "../typography";
import styled from "styled-components";
import Button, { RedButton, WhiteButton } from "../button";
import RsvpItemForm from "../RsvpItem";
import useAirtable from "../../hooks/useAirtable";
export const GuestBox = styled.article`
  border: 1px solid ${(props) => props.theme.colors.muted};
  padding: ${(props) => props.theme.spacing[3]};
  margin: ${(props) => props.theme.spacing[3]} 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ErrorMessage = styled(P)`
  color: ${(props) => props.theme.colors.danger};
  margin-top: ${(props) => props.theme.spacing[2]};
  font-weight: bold;
`;

export const GuestFieldLabel = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.accent};
  font-size: ${(props) => props.theme.fontSizes[0]};
  margin-top: ${(props) => props.theme.spacing[1]};
`;
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

  if (data.length === 0 && !loading) {
    return <RsvpItemForm onSubmit={addData} onCancel={handleCancel} />;
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
                      data={{ ...item, email: user?.email || "" }}
                      onSubmit={updateData}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <Container>
                      <Row>
                        <Col xs={12}>
                          <GuestFieldLabel>Name</GuestFieldLabel>
                          {/* @ts-ignore */}
                          <P className="font-bold">{item.name}</P>
                        </Col>
                        <Col xs={12}>
                          <GuestFieldLabel>Email</GuestFieldLabel>
                          <P>{item?.email || <span>No email provided</span>}</P>
                        </Col>
                        <Col xs={12}>
                          <GuestFieldLabel>Phone number:</GuestFieldLabel>
                          <P>
                            {item.phoneNumber || item.phone_number || (
                              <em>No phone number</em>
                            )}
                          </P>
                        </Col>
                        <Col xs={12}>
                          <GuestFieldLabel>Over 21?</GuestFieldLabel>
                          <P>{item.over21 || item.over_21 ? "Yes" : "No"}</P>
                        </Col>
                        <Col xs={12}>
                          <GuestFieldLabel>Notes</GuestFieldLabel>
                          <P>{item.notes}</P>
                        </Col>
                        <Col xs={12} className="d-flex mt-4">
                          <WhiteButton onClick={() => handleEdit(item.id)}>
                            Edit
                          </WhiteButton>
                          <RedButton onClick={() => deleteData(item.id)}>
                            Delete
                          </RedButton>
                        </Col>
                      </Row>
                    </Container>
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
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                  {/* @ts-ignore */}
                  <H4 centered>Add a guest</H4>
                  <Button onClick={() => setCreating(true)}>Add guest</Button>
                </div>
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
