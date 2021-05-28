import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styled from 'styled-components'
import Button, { WhiteButton, RedButton } from '../components/button'
import { Row, Container, Col } from 'reactstrap'
import { H4 } from '../components/typography'

const FancyInput = styled.input(props => ({
  fontSize: props.theme.fontSizes[1],
  color: props.theme.colors.text,
  fontFamily: props.theme.fonts.body,
  border: 'none',
  borderBottom: `${props.theme.borders[1]} solid ${props.theme.colors.text}`,
  borderTop: 'none',
  borderLeft: 'none',
  padding: props.theme.spacing[2],
  marginTop: props.theme.spacing[3],
  marginBottom: props.theme.spacing[3],
  width: '100%',
}))


const FormRow = styled(Row)(props => ({
  marginTop: props.theme.spacing[5],
}))

const FormCol = styled(Col)`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`

const FancyLabel = styled.label`
font-weight: ${props => props.theme.fontWeights.heavy};
display: inline-block;
`

const DeleteButton = styled(RedButton)`
display: block;
margin: auto;
`

const YesButton = styled(WhiteButton)`
flex-basis: 45%;
background-color: ${props => props.status ? props.theme.colors.accent : props.theme.colors.background};
transition: all 0.4s ease-out;
`

const NoButton = styled(YesButton)`
background-color: ${props => props.status ? props.theme.colors.background : props.theme.colors.accent};
`


const FieldArray = () => {
  const { register, control, handleSubmit, setValue, getValues, watch } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute 
  });
  const { fields, append, remove  } = useFieldArray({
    control,
    name: "test"
  });

  const handleToggle = (index, input) => {
    setValue(`test.${index}.over21`, input)
    console.log(getValues())
  }

  const status = watch('test')

  return (
    <Container>
      <form onSubmit={handleSubmit(data => console.log(data))}>

        {fields.map((item, index) => (
          <Row key={item.id} className="justify-content-center">

            <Col xs={12} md={8}>
              <H4>Guest {index + 1}</H4>
            </Col>
            <FormCol xs={12} md={8}>
              <Container>
                <Row className="align-items-center" >
                  <Col xs={12} lg={4}>
                    <FancyLabel htmlFor={`test.${index}.name`}>Name</FancyLabel>
                  </Col>
                  <Col xs={12} lg={8}>
                    <FancyInput
                      {...register(`test.${index}.name`)}
                      id={`test.${index}.name`}
                      defaultValue={item.name} // make sure to set up defaultValue
                    />
                  </Col>
                </Row>
                <Row className="align-items-center" >
                  <Col xs={12} lg={4}>
                    <FancyLabel htmlFor={`test.${index}.phoneNumber`}>Phone number</FancyLabel>
                  </Col>
                  <Col xs={12} lg={8}>
                    <FancyInput
                      {...register(`test.${index}.phoneNumber`)}
                      defaultValue={item.phoneNumber} // make sure to set up defaultValue
                    />
                  </Col>
                </Row>
                <Row className="align-items-center" >
                  <Col xs={12} lg={4} >
                    <FancyLabel htmlFor={`test.${index}.over21`}>Is guest over 21?</FancyLabel>
                  </Col>
                  <Col xs={12} lg={8} className="justify-content-between d-flex">
                    <FancyInput
                    type="hidden"
                      {...register(`test.${index}.over21`)}
                      defaultValue={item.over21 || false} // make sure to set up defaultValue
                    />
                    <YesButton status={status[index].over21} type="button" onClick={() => handleToggle(index, true)} >Yes</YesButton>
                    <NoButton status={status[index].over21} type="button" onClick={() => handleToggle(index, false)} >No</NoButton>
                  </Col>
                </Row>
                <Row className="align-items-center" >
                  <Col xs={12} lg={4}>
                    <FancyLabel htmlFor={`test.${index}.notes`}>Notes</FancyLabel>
                  </Col>
                  <Col xs={12} lg={8}>
                    <FancyInput {...register(`test.${index}.notes`)} defaultValue={item.notes} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <DeleteButton type="button" onClick={() => remove(index)}>Delete</DeleteButton>
                  </Col>
                </Row>
              </Container>
            </FormCol>
          </Row>
        ))}
        <FormRow className="justify-content-around text-center">
          <Col xs={5} md={3}>
            <WhiteButton
              type="button"
              onClick={() => append({ name: "", phoneNumber: "", notes: "" })}
            >
              Add guest
            </WhiteButton>
          </Col>
          <Col xs={5} md={3}>
            <Button as="input" type="submit" />
          </Col>
        </FormRow>
      </form>
    </Container>

  );
}

export default FieldArray