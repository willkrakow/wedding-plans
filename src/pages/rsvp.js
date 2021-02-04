import React, { useState } from "react";
import { Form, Input, Button, Container } from "reactstrap";
import Layout from "../components/layout";
import { useForm } from "react-hook-form";
import { Row, Col, FormGroup, Label } from "reactstrap";

export default function Rsvp() {
  const [familyCount, setFamilyCount] = useState([0]);

  const { register, handleSubmit, watch, errors, getValues } = useForm();
  // const onSubmit = data => console.log(data)

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const onSubmit = (data) => {
    console.log(data);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "rsvp", ...data }),
    })
      .then(() => alert("Success!"))
      .catch((error) => alert(error));
  };

  const addMember = () => {
    setFamilyCount([1, ...familyCount]);
  };

  const removeMember = (index) => {
    let temp = familyCount.splice(index, 1);
    setFamilyCount([...temp]);
  };

  const meals = [
    {
      title: "Roasted Spring Vegetables with Peanut Soy Sauce",
      image:
        "https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      title: "Spaghetti with Black Bean Marinara",
      image:
        "https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    {
      title: "Lemon Ginger Salmon Filet with Mashed Rosemary Potatoes",
      image:
        "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ];

  watch();

  const values = getValues()
  return (
    <Layout metatitle="RSVP">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container className="my-5">
          {familyCount.map((member, index) => (
            <Row className="my-4" key={index}>
              <Col xs={12} md={3}>
                <label className="d-block" htmlFor="name">
                  First name
                </label>
                <Input
                  type="text"
                  name={`guest_firstname-${index}`}
                  innerRef={register}
                  placeholder="Jane"
                  className="d-inline rounded-0"
                  required={true}
                />
                {errors[`guest_firstname-${index}`] && (
                  <span>Please enter a first name</span>
                )}
              </Col>
              <Col xs={12} md={3}>
                <label className="d-block" htmlFor="name">
                  Last name
                </label>
                <Input
                  type="text"
                  name={`guest_lastname-${index}`}
                  innerRef={register}
                  placeholder="Doe"
                  className="d-inline rounded-0"
                  required={true}
                />
                {errors[`guest_lastname-${index}`] && (
                  <span>Please enter a last name</span>
                )}
              </Col>
              <Col xs={12} md={3}>
                <FormGroup>
                  <Label htmlFor={`guest_meal-${index}`}>Meal option....</Label>
                  <Input
                    type="select"
                    name={`guest_meal-${index}`}
                    id={`guest_meal-${index}`}
                    innerRef={register}
                    required={true}
                    className="rounded-0"
                  >
                    {meals.map((meal, mealindex) => (
                      <option value={mealindex}>{meal.title}</option>
                    ))}
                  </Input>
                  {errors[`guest_meal-${index}`] && (
                    <span>Please choose an option</span>
                  )}
                </FormGroup>
              </Col>
              <Col xs={12} md={2}>
                <FormGroup>
                  <Label
                    className="d-inline-block text-center w-100"
                    htmlFor={`guest_over21-${index}`}
                  >
                    Over 21?
                    <div className="w-100"></div>
                    <div
                      className={
                        values[`guest_over21-${index}`]
                          ? "btn btn-dark d-block rounded-0"
                          : "btn btn-outline-dark d-block rounded-0"
                      }
                    >
                      {values[`guest_over21-${index}`] ? <span className="text-light">&#10003; Yes</span> : <span>Yes</span>}
                    </div>
                    <Input
                      id={`guest_over21-${index}`}
                      innerRef={register}
                      name={`guest_over21-${index}`}
                      type="checkbox"
                      className="d-none"
                    />
                  </Label>
                </FormGroup>
              </Col>
              <Col xs={12} md={1} className="align-items-end d-flex">
                <Button
                  className="btn d-inline w-25"
                  close
                  onClick={(index) => removeMember(index)}
                />
              </Col>
            </Row>
          ))}
          <Row className="my-4">
            <Col xs={12} md={4}>
              <Button
                className="rounded-0 w-100 text-start text-secondary"
                color="light"
                onClick={addMember}
              >
                <span className="h4">+&nbsp;</span>
                Add guest
              </Button>
            </Col>
          </Row>
          <Row className="my-4 justify-content-end">
            <Col xs={12} md={2}>
              <Button type="submit" className="btn btn-dark rounded-0">
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Layout>
  );
}
