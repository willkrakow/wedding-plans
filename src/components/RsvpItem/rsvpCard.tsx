import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { GuestFieldLabel, OwnerBadge } from './styles'
import { P } from '../typography'
import { WhiteButton, RedButton } from '../button'
import { RsvpRecord } from '../fieldArray'

interface Props {
    item: RsvpRecord;
    onDelete: (id: string) => void;
    handleEdit: (id: string) => void;
}

const RsvpCard = ({ item, handleEdit, onDelete }: Props) => {
    return (
      <Container className="position-relative">
        {item.is_account_owner && <OwnerBadge>Me</OwnerBadge>}
        <Row>
          <Col xs={12}>
            <GuestFieldLabel>Name </GuestFieldLabel>
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
            <WhiteButton onClick={() => handleEdit(item.id)}>Edit</WhiteButton>
            <RedButton onClick={() => onDelete(item.id)}>Delete</RedButton>
          </Col>
        </Row>
      </Container>
    );
}

export default RsvpCard