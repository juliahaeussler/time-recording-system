import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Field } from "formik";
import Select from "react-select";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { de } from "date-fns/locale";

export const TextInput = ({ ...props }) => {
  return (
    <Field name={props.name} key={props.name}>
      {({ field, form }) => (
        <FormControl isRequired={props.isRequired}>
          <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
          <Input
            {...field}
            id={props.name}
            type={props.type || "text"}
            size="sm"
            autoComplete="off"
          />
        </FormControl>
      )}
    </Field>
  );
};

export const TextAreaInput = ({ ...props }) => {
  return (
    <Field name={props.name} key={props.name}>
      {({ field, form }) => (
        <FormControl isRequired={props.isRequired}>
          <FormLabel mt={"10px"} htmlFor={props.name}>
            {props.label}
          </FormLabel>
          <Textarea {...field} id={props.name} h="200px" />
        </FormControl>
      )}
    </Field>
  );
};

export const SelectInput = ({ ...props }) => {
  return (
    <Field name={props.name} key={props.name}>
      {({ field, form }) => (
        <FormControl isRequired={props.isRequired}>
          <FormLabel mt={"10px"} htmlFor={props.name}>
            {props.label}
          </FormLabel>
          <Select
            {...field}
            {...props}
            id={props.name}
            name={props.name}
            options={props.options}
            onChange={props.handleChange}
            value={props.value}
            styles={{
              valueContainer: (base) => ({ ...base, height: "36px" }),
              indicatorSeperator: (base) => ({ ...base, height: "36px" }),
              indicatorsContainer: (base) => ({ ...base, height: "36px" }),
              control: (base) => ({
                ...base,
                height: "36px",
                minHeight: "36px",
                borderColor: "#DEE5EE",
              }),
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </FormControl>
      )}
    </Field>
  );
};

export const DateInput = ({ ...props }) => {
  registerLocale("de", de);
  return (
    <Field name={props.name} key={props.name}>
      {({ field, form }) => (
        <FormControl isRequired={props.isRequired}>
          <FormLabel mt={"10px"} htmlFor={props.name}>
            {props.label}
          </FormLabel>
          <DatePicker
            {...field}
            {...props}
            id={props.name}
            name={props.name}
            onChange={props.handleChange}
            selected={props.selected}
            locale="de"
            dateFormat="dd.MM.yyyy"
            className={props.className}
            popperPlacement="bottom-end"
            autoComplete="off"
          />
        </FormControl>
      )}
    </Field>
  );
};

export const NumberTimeInput = ({ ...props }) => {
  return (
    <Field name={props.name} key={props.name}>
      {({ field, form }) => (
        <FormControl isRequired={props.isRequired}>
          <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
          <NumberInput
            {...field}
            id={props.name}
            size="md"
            autoComplete="off"
            min={props.min}
            max={props.max}
            onChange={props.handleChange}
          >
            <NumberInputField value={props.value} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      )}
    </Field>
  );
};
