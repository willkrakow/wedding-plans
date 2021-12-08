import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styled from 'styled-components'
import Button, { WhiteButton, RedButton } from './button'
import { Row, Container, Col } from 'reactstrap'
import { H4 } from './typography'
import { navigate } from "gatsby-link";

interface IFancyInput {
  index: number;
}

const FancyInput = styled.input<IFancyInput>`
  font-size: ${props => props.theme.fontSizes[1]};
  color: ${props => props.index % 2 === 0 ? props.theme.colors.text : props.theme.colors.background};
  font-family: ${props => props.theme.fonts.body};
  border: none;
  padding: ${props => props.theme.spacing[2]};
  width: 100%;
  background-color: ${props => props.index % 2 === 0 ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"};
`

const TableHeader = styled(Col)`
padding-bottom: ${props => props.theme.spacing[1]};
`

const TableHeaderRow = styled(Row)`
  background-color: ${props => props.theme.colors.text};
`

const TableHeaderText = styled(H4)`
  color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing[2]};
  margin: 0;
`

interface ITableBodyRow {
  index: number;
}

const TableBodyRow = styled(Row)<ITableBodyRow>`
  background-color: ${props => props.index % 2 === 0 ? props.theme.colors.background : props.theme.colors.text};
`

const TableBodyCell = styled(Col)`
  padding: ${props => props.theme.spacing[2]};
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  display: flex;
  align-items: center;
`

interface IAgeToggle {
  status: boolean;
  index: number;
}

const CheckboxCell = styled(TableBodyCell)<IAgeToggle>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`

const AgeToggle = styled.span<IAgeToggle>`
  cursor: pointer;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.spacing[1]};
  border: 1px solid ${props => {
    if (props.status) {
      return props.theme.colors.accent;
    }
    return props.index % 2 === 0 ? props.theme.colors.background : props.theme.colors.text;
  }};
  text-decoration: ${props => props.status ? "underline" : "none"};
  color: ${props => props.index % 2 === 0 ? props.theme.colors.text : props.theme.colors.background};
  font-weight: ${props => props.status ? "bold" : "light"};
  font-family: ${props => props.theme.fonts.body};
  background-color: ${props => props.status ? props.theme.colors.accent : "transparent"};
  transition: all 0.2s ease-in-out;
  &:hover {
    text-decoration: underline;
  }
`

interface IDeleteCell {
  index: number;
}

const DeleteCell = styled(TableBodyCell)<IDeleteCell>`
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;
  font-size: ${props => props.theme.fontSizes[3]};
  display: flex;
  justify-content: center;
  color: ${props => props.index % 2 === 0 ? props.theme.colors.text : props.theme.colors.muted};
  &:hover {
    color: ${props => props.theme.colors.danger};
  }
`


const FieldArray = () => {
  const { register, control, handleSubmit, setValue, getValues, watch } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute 
  });
  const { fields, append, remove  } = useFieldArray({
    control,
    name: "test"
  });

  const handleToggle = (index: number, input: boolean): void => {
    setValue(`test.${index}.over21`, input)
    console.log(getValues())
  }

  const onSubmit = async (data: object) => {
    const res: Response = await fetch('/.netlify/functions/rsvp', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
    if (res.ok){
      await navigate("/thank-you");
      return;
    }

    console.log(res)

  }
  const status = watch('test')


  const handleDelete = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }
  return (
    <Container>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <TableHeaderRow>
          <TableHeader xs={12} md={6} lg={3}>
            <TableHeaderText centered={false} inline={true} alwaysdark={true}>
              Name
            </TableHeaderText>
          </TableHeader>
          <TableHeader xs={12} md={6} lg={3}>
            <TableHeaderText centered={false} inline alwaysdark>
              Phone
            </TableHeaderText>
          </TableHeader>
          <TableHeader xs={12} md={6} lg={2}>
            <TableHeaderText centered={false} inline alwaysdark>
              Over 21?
            </TableHeaderText>
          </TableHeader>
          <TableHeader>
            <TableHeaderText centered={false} inline alwaysdark>
              Notes
            </TableHeaderText>
          </TableHeader>
          <TableHeader xs={6} md={4} lg={1}>
            <TableHeaderText centered={false} inline alwaysdark>
              Delete
            </TableHeaderText>
          </TableHeader>
        </TableHeaderRow>
        {fields.map((item, index) => (
          <TableBodyRow index={index} key={item.id}>
            <TableBodyCell xs={12} md={6} lg={3}>
              <FancyInput
                index={index}
                {...register(`test.${index}.name`)}
                id={`test.${index}.name`}
                defaultValue={""} // make sure to set up defaultValue
                placeholder="Luke Skywalker"
              />
            </TableBodyCell>
            <TableBodyCell xs={12} md={6} lg={3}>
              <FancyInput
                index={index}
                {...register(`test.${index}.phoneNumber`)}
                defaultValue={""} // make sure to set up defaultValue
                placeholder="9198675309"
              />
            </TableBodyCell>
            <CheckboxCell status={status[index].over21} xs={12} md={6} lg={2}>
              <input
                defaultValue={"false"}
                type="hidden"
                {...register(`test.${index}.over21`)}
              />
              <AgeToggle
                status={status[index].over21}
                index={index}
                onClick={() => handleToggle(index, true)}
              >
                Yes
              </AgeToggle>
              <AgeToggle
              index={index}
                status={!status[index].over21}
                onClick={() => handleToggle(index, false)}
              >
                No
              </AgeToggle>
            </CheckboxCell>
            <TableBodyCell xs={12} md={4} lg={3}>
              <FancyInput
                index={index}
                {...register(`test.${index}.notes`)}
                defaultValue={""}
                placeholder="Special requests"
              />
            </TableBodyCell>
            <DeleteCell index={index} xs={6} md={3} lg={1} onClick={() => handleDelete(index)}>
              {fields.length > 1 && <span>&times;</span>}
            </DeleteCell>
          </TableBodyRow>
        ))}
        <Row className="justify-content-end px-0 mt-2">
          <Col className="d-flex justify-content-end px-0">
            <WhiteButton
              type="button"
              onClick={() => append({ name: "", phoneNumber: "", notes: "" })}
            >
              Add guest
            </WhiteButton>
            <Button as="input" type="submit" />
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default FieldArray