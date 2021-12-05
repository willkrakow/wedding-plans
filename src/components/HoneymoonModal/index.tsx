import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Button, { WhiteButton } from '../button';
import { H3, P } from '../typography';

const HoneymoonModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 900;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HoneymoonModalBox = styled(Container)`
    background-color: ${props => props.theme.colors.background};
    padding: ${props => props.theme.spacing[3]};
    margin: ${props => props.theme.spacing[2]};
`

const PaymentBox = styled(Col)`
display: flex;
flex-direction: column;
justify-content: center;
`

const MoneyInput = styled.input`
  padding-left: 16px;
  padding-right: 16px;
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.text};
  font-size: 18px;
  text-align: right;
  border-radius: 0;
  border-color: ${props => props.theme.colors.text};
  border-width: 2px;
  margin-bottom: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[1]};
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
`

interface IHoneymoonModalProps {
  isOpen: boolean;
  handleClose: (any) => void;
  destination: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  image: IGatsbyImageData;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentAmount: number;
  description?: string;
}

const HoneymoonModal = ({
  handleSubmit,
  destination,
  description,
  isOpen,
  handleClose,
  handleAmountChange,
  paymentAmount,
  image,
}: IHoneymoonModalProps) => {


  return isOpen ? (
    <HoneymoonModalWrapper className="honeymoon-modal-wrapper">
      <HoneymoonModalBox>
        <ModalForm onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6} className="d-flex">
              <GatsbyImage image={image} alt={destination} />
            </Col>
            <PaymentBox xs={12} md={6}>
              <H3 className="mb-3">{destination}</H3>
              <P>{description}</P>
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


export default HoneymoonModal;