import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { Field } from "formik";
import Select from "react-select";
import DatePicker from "react-datepicker";

export const TextInput = ({ ...props }) => {
  return (
    <Field name={props.name} key={props.name}>
      {({ field, form }) => (
        <FormControl>
          <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
          <Input {...field} id={props.name} size="sm" />
        </FormControl>
      )}
    </Field>
  );
};

export const TextAreaInput = ({ ...props }) => {
  return (
    <Field name={props.name} key={props.name}>
      {({ field, form }) => (
        <FormControl>
          <FormLabel mt={'10px'} htmlFor={props.name}>{props.label}</FormLabel>
          <Textarea {...field} id={props.name} h='200px' />
        </FormControl>
      )}
    </Field>
  );
};

export const SelectInput = ({ ...props }) => {
  return (
    <Field name={props.name} key={props.name} >
      {({ field, form }) => (
        <FormControl>
          <FormLabel mt={'10px'} htmlFor={props.name}>{props.label}</FormLabel>
          <Select
            {...field}
            {...props}
            id={props.name}
            name={props.name}
            options={props.options}
            onChange={props.handleChange}
            value={props.value}
            style={{control: (provided) => ({
                ...provided,
                borderColor: '#DEE5EE'
            })}}
          />
        </FormControl>
      )}
    </Field>
  );
};

export const DateInput = ({ ...props }) => {
    return (
      <Field name={props.name} key={props.name} >
        {({ field, form }) => (
          <FormControl>
            <FormLabel mt={'10px'} htmlFor={props.name}>{props.label}</FormLabel>
            <DatePicker
              {...field}
              {...props}
              id={props.name}
              name={props.name}             
              onChange={props.handleChange}
              selected={(props.value && new Date(props.value)) || null}
              dateFormat="dd/MM/yyyy"
            />
          </FormControl>
        )}
      </Field>
    );
  };
