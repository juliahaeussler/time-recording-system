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
import { TimeEntries } from "./TimeEntries";
import { TimeProjects } from "./TimeProjects";
import { Form, Formik } from "formik";
import { SelectInput, TextAreaInput, TextInput } from "../helpers/inputs";
import { useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../helpers/functions";

export const TimeTrack = () => {
  const initial = {
    project: { value: "", label: "" },
    date: "",
    hours: '',
    mins: '',
    time: "",
    phase: { value: "", label: "" },
    comment: "",
  };
  const [projects, setProjects] = useState([]);
  const [phases, setPhases] = useState([]);
  const [initialEntry, setInitialEntry] = useState(initial);

  const projectOptions = projects.map((p) => {
    return { value: p._id, label: p.name };
  });

  const phaseOptions = phases.map((p) => {
    return { value: p._id, label: p.label };
  });

  const fetchProjects = useCallback(async () => {
    const result = await getRequest("/api/projects");
    setProjects(result);
  }, []);

  const fetchPhases = useCallback(async () => {
    const result = await getRequest("/api/phases");
    setPhases(result);
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchPhases();
  }, []);

  const handleSave = async (values, actions) => {
    actions.setSubmitting(true);
    const payload = {
      ...values,
      project: values.project.value,
      phase: values.phase.value,
    };
    const result = await postRequest("/api/time_entries", payload);
    if (result.ok) {
      actions.setSubmitting(false);
      setInitialEntry(initial);
    }
  };

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
              initialValues={initialEntry}
              onSubmit={(values, actions) => handleSave(values, actions)}
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
                          handleChange={(e) =>
                       {   console.log(e.value)
                            formikProps.setFieldValue("project", e)
                            }
                          }
                          value={formikProps.values.project}
                          options={projectOptions}
                        />

                        <SelectInput
                          name="phase"
                          label="Phase"
                          handleChange={(e) =>
                            formikProps.setFieldValue("phase", e)
                          }
                          value={formikProps.values.phase}
                          options={phaseOptions}
                        />

                        <TextInput
                          name="date"
                          label="Datum"
                          value={formikProps.values.date}
                          handleChange={(e) =>
                            formikProps.setFieldValue("date", e.target.value)
                          }
                        />
                        <HStack>
                          <TextInput
                            name="hours"
                            label="Stunden"
                            value={formikProps.values.hours}
                            handleChange={(e) =>
                              formikProps.setFieldValue("hours", e.target.value)
                            }
                          />
                          <TextInput
                            name="mins"
                            label="Minuten"
                            value={formikProps.values.mins}
                            handleChange={(e) =>
                              formikProps.setFieldValue(
                                "minutes",
                                e.target.value
                              )
                            }
                          />
                        </HStack>
                      </VStack>

                      <VStack w="60%">
                        <TextAreaInput name={"comment"} label={"Kommentar"}  value={formikProps.values.comment} handleChange={(e) =>
                            formikProps.setFieldValue("comment", e.target.value)
                          } />
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
            <TimeEntries projectOptions={projectOptions} phaseOptions={phaseOptions} />
          </TabPanel>
          <TabPanel p={0}>
            <TimeProjects projects={projects} fetchProjects={fetchProjects} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
