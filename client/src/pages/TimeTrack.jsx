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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { TimeEntries } from "./TimeEntries";
import { TimeProjects } from "./TimeProjects";
import { Form, Formik } from "formik";
import {
  DateInput,
  NumberTimeInput,
  SelectInput,
  TextAreaInput,
} from "../helpers/inputs";
import { useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../helpers/functions";

export const TimeTrack = () => {
  const toast = useToast();
  const [projects, setProjects] = useState([]);
  const [phases, setPhases] = useState([]);

  console.log('test1')

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (values, actions) => {
    actions.setSubmitting(true);
    const payload = {
      ...values,
      hours: values.hours || 0,
      mins: values.mins || 0,
      project: values.project.value,
      phase: values.phase.value,
    };
    const result = await postRequest("/api/time_entries", payload);
    if (result.ok) {
      actions.setSubmitting(false);
      actions.resetForm();
      toast({
        title: "Gespeichert",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Speichern nicht möglich",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return projectOptions.length > 0 && phaseOptions.length > 0 ? (
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
                project: projectOptions[0],
                date: new Date(),
                hours: "",
                mins: "",
                time: "",
                phase: phaseOptions[0],
                comment: "",
              }}
              onSubmit={(values, actions) => handleSave(values, actions)}
            >
              {(formikProps) => (
                <Form autoComplete="off">
                  <Box>
                    <HStack
                      spacing="24px"
                      w="100%"
                      mb="15px"
                      alignItems="start"
                    >
                      <VStack w="40%">
                        <SelectInput
                          name="project"
                          label="Projekt"
                          isRequired
                          handleChange={(e) =>
                            formikProps.setFieldValue("project", e)
                          }
                          value={formikProps.values.project}
                          options={projectOptions}
                        />

                        <SelectInput
                          name="phase"
                          label="Phase"
                          isRequired
                          handleChange={(e) =>
                            formikProps.setFieldValue("phase", e)
                          }
                          value={formikProps.values.phase}
                          options={phaseOptions}
                        />

                        <DateInput
                          name="date"
                          label="Datum"
                          isRequired
                          className="new-entry-date-input"
                          selected={formikProps.values.date}
                          handleChange={(e) =>
                            formikProps.setFieldValue("date", e)
                          }
                        />

                        <HStack justify="space-between" w="100%" pt="7px">
                          <NumberTimeInput
                            name="hours"
                            label="Stunden"
                            isRequired
                            value={formikProps.values.hours}
                            handleChange={(e) =>
                              formikProps.setFieldValue("hours", e)
                            }
                            min={0}
                          />
                          <NumberTimeInput
                            name="mins"
                            label="Minuten"
                            isRequired
                            value={formikProps.values.mins}
                            handleChange={(e) =>
                              formikProps.setFieldValue("mins", e)
                            }
                            min={0}
                            max={59}
                          />
                        </HStack>
                      </VStack>

                      <VStack
                        w="60%"
                        h="100%"
                        justify="space-between"
                        spacing="30px"
                      >
                        <TextAreaInput
                          name={"comment"}
                          label={"Kommentar"}
                          value={formikProps.values.comment}
                          handleChange={(e) =>
                            formikProps.setFieldValue("comment", e.target.value)
                          }
                        />
                        <Stack d="flex" align="end" w="100%">
                          <Button
                            bgColor={"brand.900"}
                            color={"white"}
                            type="submit"
                            isLoading={formikProps.isSubmitting}
                          >
                            Speichern
                          </Button>
                        </Stack>
                      </VStack>
                    </HStack>
                  </Box>
                </Form>
              )}
            </Formik>
          </TabPanel>
          <TabPanel p={0}>
            <TimeEntries
              projectOptions={projectOptions}
              phaseOptions={phaseOptions}
            />
          </TabPanel>
          <TabPanel p={0}>
            <TimeProjects projects={projects} fetchProjects={fetchProjects} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  ) : null;
};
