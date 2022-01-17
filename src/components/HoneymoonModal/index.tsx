import React from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Button, { WhiteButton } from "../button";
import { H3, H4, P } from "../typography";
import { HoneymoonOptionProps } from "../../pages/honeymoon";

const HoneymoonModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing[3]};
`;

const HoneymoonModalBox = styled(Container)`
  background-color: ${(props) => props.theme.colors.background};
  margin: ${(props) => props.theme.spacing[1]};
  max-width: 900px;
  overflow-y: scroll;
  height: auto;
`;

const PaymentBox = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MoneyInput = styled.input`
  padding-left: 16px;
  padding-right: 16px;
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
  text-align: right;
  border-radius: 0;
  border-color: ${(props) => props.theme.colors.text};
  border-width: 2px;
  margin-bottom: ${(props) => props.theme.spacing[2]};
  margin-top: ${(props) => props.theme.spacing[2]};
  padding: ${(props) => props.theme.spacing[1]};
  box-sizing: border-box;
  &:before {
    content: "$";
  }
`;

const MoneyLabel = styled.label`
  margin-right: ${(props) => props.theme.spacing[2]};
  font-weight: ${(props) => props.theme.fontWeights.heavy};
  color: ${(props) => props.theme.colors.muted};
`;

const LabelWrapper = styled.div`
  position: relative;
  &:before {
    content: "$";
    position: absolute;
    top: 20px;
    left: 12px;
    color: ${(props) => props.theme.colors.muted};
  }
`;

const ModalForm = styled.form`
  min-height: 450px;
  display: flex;
  justify-content: space-between;
`;

interface IHoneymoonModalProps {
  isOpen: boolean;
  handleClose: (any) => void;
  destination?: HoneymoonOptionProps;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentAmount: number;
}

const HoneymoonModal = ({
  handleSubmit,
  destination,
  isOpen,
  handleClose,
  handleAmountChange,
  paymentAmount,
}: IHoneymoonModalProps) => {
  return isOpen && destination?.data  ? (
    <HoneymoonModalWrapper className="honeymoon-modal-wrapper">
      <HoneymoonModalBox>
        <ModalForm onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6} className="d-flex">
              <GatsbyImage image={destination.data.image.localFiles[0].childImageSharp.gatsbyImageData} alt={destination.data.name} />
            </Col>
            <PaymentBox xs={12} md={6}>
              <H3 className="mb-3">{destination.data.name}</H3>
              <H4 centered={false} inline alwaysdark className="mb-2">{destination.data.location}</H4>
              <div>
                <MoneyLabel>
                  <LabelWrapper>
                    <MoneyInput
                      type="number"
                      value={paymentAmount}
                      onChange={handleAmountChange}
                    />
                  </LabelWrapper>
                </MoneyLabel>
                <Button type="submit">Pay and vote</Button>
                <WhiteButton onClick={handleClose}>Cancel</WhiteButton>
              </div>
            </PaymentBox>
          </Row>
        </ModalForm>
      </HoneymoonModalBox>
    </HoneymoonModalWrapper>
  ) : null;
};

const ActivityBadge = styled(Badge)`
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.accent};
  font-family: ${(props) => props.theme.fonts.body};
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes[1]};
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing[2]};
`

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${(props) => props.theme.spacing[1]} 0;
`

export default HoneymoonModal;

interface HoneymoonDetails {
  destination?: HoneymoonOptionProps;
  isOpen: boolean;
  handleClose: () => void;
  handlePay: () => void;
}

const HoneymoonDetailsModal = ({
  destination,
  isOpen,
  handleClose,
  handlePay,
}: HoneymoonDetails) => {
  return isOpen && destination?.data ? (
    <HoneymoonModalWrapper>
      <HoneymoonModalBox>
        <Row>
          <Col xs={12} md={6} className="my-2">
            <GatsbyImage
              className="d-flex"
              image={
                destination.data.image.localFiles[0].childImageSharp
                  .gatsbyImageData
              }
              alt={destination.data.name}
            />
          </Col>
          <PaymentBox xs={12} md={6} className="my-2">
            <H3>{destination.data.name}</H3>
            <H4 centered={false} inline alwaysdark className="mb-2">
              {destination.data.location}
            </H4>
            <P>{destination.data.description}</P>
            <ActivityList>
              {destination.data.activities.map((option, index) => (
                <li key={index} className="my-1">
                  <ActivityBadge>{option}</ActivityBadge>
                </li>
              ))}
            </ActivityList>
            <div className="d-flex justify-content-between">
              <Button className="my-2" onClick={handlePay}>
                Vote and pay
              </Button>
              <WhiteButton className="my-2" onClick={handleClose}>
                Cancel
              </WhiteButton>
            </div>
          </PaymentBox>
          {destination.data.image.localFiles.slice(1).map((image, index) => (
            <Col key={index} xs={12} md={6} className="my-2">
              <GatsbyImage
                className="d-flex"
                image={image.childImageSharp.gatsbyImageData}
                alt={destination.data.name}
              />
            </Col>
          ))}
        </Row>
      </HoneymoonModalBox>
    </HoneymoonModalWrapper>
  ) : null;
};

export { HoneymoonDetailsModal };