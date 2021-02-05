// import React, { useState } from "react";
// import { Form, Input, Button, Container } from "reactstrap";
// import Layout from "../components/layout";
// import { useForm } from "react-hook-form";
// import { Row, Col, FormGroup, Label } from "reactstrap";
// import { navigate } from "gatsby";
// import _ from 'lodash'
// export default function Rsvp() {
//   const [familyCount, setFamilyCount] = useState([0]);

//   const { register, handleSubmit, watch, errors, getValues } = useForm();
//   // const onSubmit = data => console.log(data)

//   const encode = (data) => {
//     return Object.keys(data)
//       .map(
//         (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
//       )
//       .join("&");
//   };

//   const onSubmit = (data, e) => {
//     console.log(data);
//     fetch("/", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: encode({ "form-name": "rsvp", ...data }),
//     })
//       .then(() => navigate('/thank-you'))
//       .catch((error) => alert(error));
//       e.preventDefault()
//   };

//   const addMember = () => {
//     console.log(familyCount)
//     setFamilyCount([familyCount.length, ...familyCount]);
//   };

//   const removeMember = (index) => {
//     console.log(familyCount)
//     setFamilyCount([...familyCount.splice(0, index), ...familyCount.splice(index)]);
//   };

//   const meals = [
//     {
//       title: "Roasted Spring Vegetables with Peanut Soy Sauce",
//       image:
//         "https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     },
//     {
//       title: "Spaghetti with Black Bean Marinara",
//       image:
//         "https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     },
//     {
//       title: "Lemon Ginger Salmon Filet with Mashed Rosemary Potatoes",
//       image:
//         "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     },
//   ];

//   watch();

//   const values = getValues()
//   return (
//     <Layout metatitle="RSVP">
//       <Form
//         onSubmit={handleSubmit(onSubmit)}
//         data-netlify="true"
//         name="rsvp"
//         method="POST"
//         action="/thank-you/"
//         netlify-honeypot="bot-field"
//       >
//         <Container className="my-5">
//           {familyCount.map((member, index) => (
//             <Row className="my-4 border border-secondary" key={index}>
//               <Col xs={12} md={3} className="my-2">
//                 <label className="d-block" htmlFor="name">
//                   First name
//                 </label>
//                 <Input
//                   type="text"
//                   name={`guest_firstname-${index}`}
//                   innerRef={register}
//                   placeholder="Jane"
//                   className="d-inline rounded-0"
//                   required={true}
//                 />
//                 {errors[`guest_firstname-${index}`] && (
//                   <span>Please enter a first name</span>
//                 )}
//               </Col>
//               <Col xs={12} md={3} className="my-2">
//                 <label className="d-block" htmlFor="name">
//                   Last name
//                 </label>
//                 <Input
//                   type="text"
//                   name={`guest_lastname-${index}`}
//                   innerRef={register}
//                   placeholder="Doe"
//                   className={`d-inline rounded-0 ${
//                     errors[`guest_lastname-${index}`] && "border-danger"
//                   }`}
//                   required={true}
//                 />
//                 {errors[`guest_lastname-${index}`] && (
//                   <span>Please enter a last name</span>
//                 )}
//               </Col>
//               <Col xs={12} md={3} className="my-2">
//                 <FormGroup>
//                   <Label htmlFor={`guest_meal-${index}`}>Dinner option</Label>
//                   <Input
//                     type="select"
//                     name={`guest_meal-${index}`}
//                     id={`guest_meal-${index}`}
//                     innerRef={register}
//                     required={true}
//                     className="rounded-0"
//                   >
//                     {meals.map((meal, mealindex) => (
//                       <option value={mealindex} key={mealindex}>{meal.title}</option>
//                     ))}
//                   </Input>
//                   {errors[`guest_meal-${index}`] && (
//                     <span>Please choose an option</span>
//                   )}
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={2} className="my-2">
//                 <FormGroup>
//                   <Label
//                     className="d-inline-block text-left w-100 mb-0"
//                     htmlFor={`guest_over21-${index}`}
//                   >
//                     <span className="mb-2 d-inline-block">Over 21?</span>
//                     <div className="w-100"></div>
//                     <div
//                       className={
//                         values[`guest_over21-${index}`]
//                           ? "btn btn-dark d-block rounded-0"
//                           : "btn btn-outline-dark bg-light d-block rounded-0"
//                       }
//                     >
//                       {values[`guest_over21-${index}`] ? (
//                         <span className="text-light">&#10003; Yes</span>
//                       ) : (
//                         <span>Yes</span>
//                       )}
//                     </div>
//                     <Input
//                       id={`guest_over21-${index}`}
//                       innerRef={register}
//                       name={`guest_over21-${index}`}
//                       type="checkbox"
//                       className="d-none"
//                     />
//                   </Label>
//                 </FormGroup>
//               </Col>
//               {index !== 0 && (
//                 <Col xs={12} md={1} className="align-items-center d-flex my-2">
//                   <Button
//                     className="btn w-100 mt-3 font-weight-lighter btn-dark rounded-0"
//                     onClick={() => removeMember(index)}
//                   >
//                     X
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ))}
//           <Row className="my-4">
//             <Col xs={12} md={3}>
//               <Button
//                 className="rounded-0 w-100 text-start text-secondary"
//                 color="light"
//                 onClick={() => addMember(familyCount.length)}
//               >
//                 <span className="h4">+&nbsp;</span>
//                 Add guest
//               </Button>
//             </Col>
//           </Row>
//           <input type="hidden" name="form-name" value="RSVP" />
//           <Row className="my-4 justify-content-end">
//             <Col xs={12} md={2}>
//               <Button type="submit" className="btn btn-dark rounded-0">
//                 Submit
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//       </Form>
//     </Layout>
//   );
// }

import React from "react";
import RsvpForm from "../components/rsvpForm";
import Layout, { ClassyCard } from "../components/layout";

const Rsvp = () => (
  <Layout metatitle="RSVP">
    <ClassyCard>
      <RsvpForm />
    </ClassyCard>
  </Layout>
);

export default Rsvp;
