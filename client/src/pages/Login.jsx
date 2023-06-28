import { Center, Button, VStack, Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { postRequest } from "../helpers/functions";
import { useNavigate } from "react-router";
import { TextInput } from "../helpers/inputs";

export const Login = () => {
  const navigate = useNavigate();
  const handleSave = async (values, actions) => {
    actions.setSubmitting(true);
    const response = await postRequest("/api/login", values);
    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user.user));
      navigate("/zeiterfassung");
      actions.setSubmitting(false);
    }
  };

  return (
    <Box pt={"60px"}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => handleSave(values, actions)}
      >
        {(formikProps) => (
          <Form>
            <Center mt={8}>
              <VStack w={"250px"}>
                <VStack w="100%" mb="15px">
                  <TextInput
                    label={"Benutzer"}
                    isRequired
                    id="username"
                    size="sm"
                    value={formikProps.values.username}
                    name={"username"}
                    onChange={(e) =>
                      formikProps.setFieldValue("username", e.target.value)
                    }
                  />
                  <TextInput
                    label={"Passwort"}
                    isRequired
                    id="password"
                    size="sm"
                    type="password"
                    value={formikProps.values.password}
                    name={"password"}
                    onChange={(e) =>
                      formikProps.setFieldValue("password", e.target.value)
                    }
                  />
                </VStack>
                <Button
                  w="100%"
                  bgColor={"brand.900"}
                  color={"white"}
                  type="submit"
                >
                  Log in
                </Button>
              </VStack>
            </Center>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
