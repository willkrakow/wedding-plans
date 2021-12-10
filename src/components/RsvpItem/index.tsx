import React from "react";
import { RsvpRecord } from "../fieldArray";
import { FancyInput, TwentyOneToggle } from "../RsvpList/styles";
import Button, { WhiteButton } from "../../components/button";
import { Container, Col, Row } from "reactstrap";
import { GuestFieldLabel } from "../RsvpList";
import styled from "styled-components";

interface Props {
  data?: RsvpRecord | any;
  onSubmit: (data: any, id?: string) => void;
  onCancel: () => void;
}

const FullHeightContainer = styled(Container)`
    height: 100%;
    flex: 1;
`

const defaultData = {
  name: "",
  email: "",
  phone_number: "",
  over21: false,
  notes: "",
};

const RsvpItemForm = ({ data = defaultData, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = React.useState<RsvpRecord | null | any>(data);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData, data?.id || null);
  };

  return (
    <FullHeightContainer className="d-flex flex-column">
      <form onSubmit={handleSubmit} className="d-flex">
        <Row className="h-100">
          <Col xs={12}>
            <GuestFieldLabel>Name</GuestFieldLabel>
            <FancyInput
              type="text"
              placeholder="Luke Skywalker"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Col>
          <Col xs={12}>
            <GuestFieldLabel>Email</GuestFieldLabel>
            <FancyInput
              type="text"
              placeholder="lukeskywalker@example.com"
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Col>
          <Col xs={12}>
            <GuestFieldLabel>Phone number</GuestFieldLabel>
            <FancyInput
              type="text"
              placeholder="9198675309"
              value={formData?.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
            />
          </Col>
          <Col xs={12}>
            <GuestFieldLabel>Over 21?</GuestFieldLabel>
            <label className="w-100 pb-2">
              <input type="checkbox" hidden value={formData?.over21} />
              <TwentyOneToggle
                active={formData?.over21}
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, over21: true });
                }}
              >
                Yes
              </TwentyOneToggle>
              <TwentyOneToggle
                active={!formData?.over21}
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({ ...formData, over21: false });
                }}
              >
                No
              </TwentyOneToggle>
            </label>
          </Col>
          <Col xs={12}>
            <GuestFieldLabel>Notes</GuestFieldLabel>
            <FancyInput
              as="textarea"
              rows={1}
              placeholder="Anything you want to say"
              value={formData?.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </Col>

          <Col xs={12} className="d-flex mt-4">
            <Button type="submit">Save</Button>
            <WhiteButton onClick={onCancel}>Cancel</WhiteButton>
          </Col>
        </Row>
      </form>
    </FullHeightContainer>
  );
};



export default RsvpItemForm;