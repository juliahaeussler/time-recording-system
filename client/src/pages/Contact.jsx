import { Box, Button, VStack, Center, Stack, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { TextAreaInput, TextInput } from "../helpers/inputs";
import { postRequest } from "../helpers/functions";

export const Contact = () => {
  const toast = useToast();

  const handleSave = async (values, actions) => {
    actions.setSubmitting(true);
    const response = await postRequest("/api/contact", values);
    const result = await response.json();
    toast({
      title: result.msg,
      status: result.status,
      duration: 9000,
      isClosable: true,
    });
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Box>
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        onSubmit={(values, actions) => handleSave(values, actions)}
      >
        {(formikProps) => (
          <Form>
            <Center>
              <VStack w="500px" align="center">
                <VStack w="100%">
                  <TextInput
                    name="name"
                    label="Name"
                    isRequired
                    handleChange={(e) =>
                      formikProps.setFieldValue("name", e.target.value)
                    }
                    value={formikProps.values.name}
                  />
                  <TextInput
                    name="email"
                    label="E-Mail"
                    isRequired
                    handleChange={(e) =>
                      formikProps.setFieldValue("email", e.target.value)
                    }
                    value={formikProps.values.email}
                  />
                  <TextAreaInput
                    name="message"
                    label="Nachricht"
                    isRequired
                    handleChange={(e) =>
                      formikProps.setFieldValue("message", e.target.value)
                    }
                    value={formikProps.values.message}
                  />
                </VStack>

                {/* <div 
                id="html_element" 
                // className="g-recaptcha" 
                // data-sitekey={process.env.RECAPTCHA}
                ></div> */}

                <Stack d="flex" align="end" w="100%">
                  <Button
                    size="sm"
                    color="white"
                    bgColor={"brand.700"}
                    type="submit"
                    isLoading={formikProps.isSubmitting}
                  >
                    Absenden
                  </Button>
                </Stack>
              </VStack>
            </Center>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
