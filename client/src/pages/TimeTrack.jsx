import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { TimeEntries } from "./Entries";
import { TimeProjects } from "./TimeProjects";
import { Form, Formik } from "formik";
import { SelectInput, TextAreaInput, TextInput } from "../helpers/inputs";

export const TimeTrack = () => {
  return (
    <Box>
      <Tabs isLazy isFitted>
        <TabList mb="1em">
          <Tab>Neuer Eintrag</Tab>
          <Tab>Letzte Einträge</Tab>
          <Tab>Projekte</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Formik
              initialValues={{
                project: "",
                date: "",
                time: "",
                phase: "",
                comment: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {(formikProps) => (
                <Form>
                  <Box mt={8}>
                    <HStack
                      spacing="24px"
                      w="100%"
                      mb="15px"
                      h="250px"
                      alignItems="start"
                    >
                      <VStack w="40%">
                        <SelectInput
                          name="project"
                          label="Projekt"
                          handleChange={(e) => console.log(e)}
                          value={formikProps.values.project}
                          options={[
                            { value: 1, label: "one" },
                            { value: 2, label: "two" },
                          ]}
                        />

                        <SelectInput
                          name="phase"
                          label="Phase"
                          handleChange={(e) => console.log(e)}
                          value={formikProps.values.phase}
                        />

                        <TextInput name="date" label="Datum" />
                      </VStack>

                      <VStack w="60%">
                        <TextAreaInput name={"comment"} label={"Kommentar"} />
                      </VStack>
                    </HStack>

                    <Box d="flex" align="end">
                      <Button
                        bgColor={"brand.900"}
                        color={"white"}
                        type="submit"
                      >
                        Speichern
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </TabPanel>
          <TabPanel p={0}>
            <TimeEntries />
          </TabPanel>
          <TabPanel p={0}>
            <TimeProjects />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
