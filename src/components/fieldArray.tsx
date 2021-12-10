import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button, { WhiteButton } from './button'
import { Row, Container, Col } from 'reactstrap'
import { navigate } from "gatsby-link";
import useAuth from "../hooks/useAuth";
import { AgeToggle, TableHeaderRow, TableBodyCell, TableBodyRow, TableHeader, TableHeaderText, CheckboxCell, DeleteCell, FancyInput } from './RsvpList/styles'
export interface RsvpRecord {
  name: string;
  phoneNumber: string;
  notes: string;
  over21: boolean;
  over_21: boolean;
  id: string;
  phone_number: string;
  email: string;
}

interface Props {
  existingData?: RsvpRecord[];
  httpMethod?: "POST" | "UPDATE" | "DELETE";
  onDelete?: (id: string) => void;
}

const FieldArray = ({existingData, onDelete, httpMethod = "POST"}: Props) => {
  const { user, login } = useAuth();

  const { register, control, handleSubmit, setValue, getValues, watch } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute 
  });
  const { fields, append, remove  } = useFieldArray({
    control,
    name: "test"
  });

  React.useEffect(() => {
    if (existingData) {
      existingData.forEach(data => {
        append({
          name: data.name,
          phoneNumber: data.phoneNumber,
          notes: data.notes,
          over21: data.over21,
          id: data.id
        });
      });
    }
  }, [existingData, append]);

  const handleToggle = (index: number, input: boolean): void => {
    setValue(`test.${index}.over21`, input)
    console.log(getValues())
  }

  const onSubmit = async (data: object) => {
    if (!user){
      login()
      return
    }
    const formData = {user, ...data}
    const res: Response = await fetch('/.netlify/functions/rsvp', {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(formData),
    })
    if (res.ok){
      await navigate("/thank-you");
      return;
    }
    console.log(res)
  }
  const status = watch('test')


  const handleDelete = (index: number, id: string) => {
    if (onDelete) {
      console.log(id)
      onDelete(id);
    }
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
            <input
              type="hidden"
              {...register(`test.${index}.id`)}
              defaultValue={item.id || ""}
            />
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
            <DeleteCell
              index={index}
              xs={6}
              md={3}
              lg={1}
              onClick={() => handleDelete(index, item.id)}
            >
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