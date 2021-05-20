import React from "react";
import { useForm } from "react-hook-form";
import { navigate, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import "@fontsource/courgette";
import "@fontsource/open-sans";
import _ from "lodash";
import Button, { RedButton, WhiteButton } from "./button";

const FancySelect = styled.select(props => ({
  fontSize: props.theme.fontSizes[1],
  fontFamily: props.theme.fonts.body,
  width: '100%',
  paddingTop: props.theme.spacing[1],
  paddingBottom: props.theme.spacing[1],
  paddingRight: props.theme.spacing[1],
  paddingLeft: props.theme.spacing[1],
  border: 'none',
  borderBottom: '2px solid',
  borderColor: props.theme.colors.muted,
}))

const FancyInput = styled.input(props => ({
  width: '100%',
  fontFamily: props.theme.fonts.headers,
  paddingTop: props.theme.spacing[1],
  paddingBottom: props.theme.spacing[1],
  paddingLeft: props.theme.spacing[2],
  paddingRight: props.theme.spacing[2],
  border: 'none',
  borderBottom: '2px solid',
  borderColor: props.theme.colors.muted,
}))

const LabelTitle = styled.span(props => ({
  fontFamily: props.theme.fonts.headers,
  fontSize: props.theme.fontSizes[1],
  color: props.theme.colors.text,
}))

function FieldArray() {
  const [indexes, setIndexes] = React.useState([0]);
  const [counter, setCounter] = React.useState(1);
  const { register, handleSubmit, errors } = useForm({
      reValidateMode: 'onSubmit',
  });

  const onSubmit = (formData) => {
    if (formData.length < 1) {
      alert("Please add at least one guest");
    } else {
      const guestList = allAirtable.edges;

      // Loop over submitted guest data
      formData.guests.forEach((guest) => {
          // Get the full guest info from the airtable query
        let fullGuestObject = _.find(guestList, function (listItem) {
            // If the item from airtable does not have a name value, use an empty string.
          const testName = listItem.node.data.name || "";
          // Return true if the test name is equal to the value from the the form submission.
          if (testName === guest.recordId) {
            console.log("true");
            return true;
          } else {
            console.log("not true at all");
            return false;
          }
        });
        guest.recordId = fullGuestObject.node.recordId;
      });

      fetch("/.netlify/functions/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({ "form-name": "rsvp", ...formData }),
      })
        .then(() => navigate("/thank-you"))
        .catch((error) => alert(error));
    }
  };

  const addGuest = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeGuest = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearGuests = () => {
    setIndexes([]);
  };

  const guests = useStaticQuery(graphql`
    {
      allAirtable(filter: { table: { eq: "guest_list" } }) {
        edges {
          node {
            recordId
            data {
              name
            }
          }
        }
      }
    }
  `);

  const { allAirtable } = guests;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {indexes.map((index) => {
        const fieldName = `guests[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <Container>
              <Row className="my-3 justify-content-center">
                {/* Guest name selector */}
                <Col className="p-4" xs={12} md={6}>
                  <label
                    htmlFor={`${fieldName}.name`}
                    className="d-flex flex-wrap"
                  >
                    <LabelTitle>Name</LabelTitle>
                    <FancyInput
                      id={`${fieldName}.recordId`}
                      list="guestNames"
                      placeholder="Legolas Girlyhair"
                      name={`${fieldName}.recordId`}
                      ref={register({
                        required: `Please enter guest ${index + 1}'s name`,
                      })}
                    />
                    <span className="text-danger">
                      {errors?.guests?.[index]?.recordId?.message}
                    </span>
                    <datalist id="guestNames">
                      {allAirtable.edges.map((edge, index) => (
                        <option key={index} value={edge.node.data.name || null}>
                          {edge.node.data.name}
                        </option>
                      ))}
                    </datalist>
                  </label>
                </Col>
                {/* Guest phone input */}
                <Col className="p-4" xs={12} md={6}>
                  <label
                    htmlFor={`${fieldName}.phone`}
                    className="d-flex flex-wrap"
                  >
                    <LabelTitle>Phone number</LabelTitle>
                    <FancyInput
                      type="tel"
                      placeholder="19198675309"
                      name={`${fieldName}.phone`}
                      className="d-block w-100"
                      ref={register({
                        minLength: 10,
                        maxLength: 12,
                      })}
                    />
                    
                  </label>
                </Col>
                {/* Guest meal selector */}
               
                {/* Guest is over 21 checkbox */}
                <Col className="p-4" xs={12} md={6}>
                  <label
                    htmlFor={`${fieldName}.over21`}
                    className="d-flex flex-wrap"
                  >
                    <LabelTitle>Guest is over 21</LabelTitle>
                    <FancySelect
                      id={`${fieldName}.over21`}
                      name={`${fieldName}.over21`}
                      ref={register({
                        required: "Please confirm guest age",
                      })}
                    >
                      <option value="Yes">Yes</option>
                      <option value="Yes but won't drink">Yes but won't drink</option>
                      <option value="No">No</option>
                    </FancySelect>
                    <span className="text-danger">
                      {errors?.guests?.[index]?.dinner?.message}
                    </span>
                  </label>
                </Col>
                {/* Guest notes input */}
                <Col className="p-4" xs={12} md={6}>
                  <label
                    htmlFor={`${fieldName}.note`}
                    className="d-flex flex-wrap"
                  >
                    <LabelTitle>Notes, requests, etc.</LabelTitle>
                    <FancyInput
                      id={`${fieldName}.note`}
                      name={`${fieldName}.note`}
                      ref={register}
                      type="text"
                    />
                  </label>
                </Col>
                {/* Remove guest button*/}
                <Col xs={12} md={3} className="my-2 text-center">
                  {counter > 1 && (
                    <RedButton
                      type="button"
                      onClick={removeGuest(index)}
                    >
                      &times;&nbsp;Remove guest
                    </RedButton>
                  )}
                </Col>
                <Col xs={12}>
                  <hr style={{ borderTop: "2px solid rgba(0,0,0,0.2)" }} />
                </Col>
              </Row>
            </Container>
          </fieldset>
        );
      })}
      <Container>
        <Row className="d-flex justify-content-center text-center">
          <Col xs={6} md={3} className="my-3">
            <WhiteButton type="button" onClick={addGuest}>
              + Add guest
            </WhiteButton>
          </Col>
          <Col xs={6} md={3} className="my-3">
            {counter > 1 && <Button
              type="button"
              onClick={clearGuests}
            >
              Clear guest
            </Button>}
          </Col>
          <Col xs={12} md={3} className="my-3">
              {errors && console.log(errors)}
            {counter > 0 && <Button type="submit" >Submit</Button>}
          </Col>
        </Row>
      </Container>
    </form>
  );
}

export default FieldArray;