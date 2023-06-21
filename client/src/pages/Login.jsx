import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

export const Login = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formikProps) => (
        <Form>
          <Center mt={8}>
            <VStack w={"250px"}>
              <VStack w="100%" mb="15px">
                <FormControl isRequired>
                  <FormLabel>Benutzer</FormLabel>
                  <Input
                    id="username"
                    size="sm"
                    value={formikProps.values.username}
                    onChange={(e) =>
                      formikProps.setFieldValue("username", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Passwort</FormLabel>
                  <Input
                    id="password"
                    size="sm"
                    type="password"
                    value={formikProps.values.password}
                    onChange={(e) =>
                      formikProps.setFieldValue("password", e.target.value)
                    }
                  />
                </FormControl>
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
  );
};
