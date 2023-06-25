import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useDisclosure,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import { getRequest, putRequest, deleteRequest, formatDateYYYYMMDD, formatTime } from "../helpers/functions";
import { Form, Formik } from "formik";
import { SelectInput, TextAreaInput, TextInput } from "../helpers/inputs";

export const TimeEntries = ({ projectOptions, phaseOptions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entries, setEntries] = useState([]);
  const [entryToEdit, setEntryToEdit] = useState({});

  const fetchEntries = useCallback(async () => {
    const result = await getRequest("/api/time_entries");
    setEntries(result);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSave = async (values, actions) => {
    actions.setSubmitting(true);
    const payload = {
      ...values,
      project: values.project.value,
      phase: values.phase.value,
    };
    console.log("payload", payload);
    const result = await putRequest(`/api/time_entries/${values._id}`, payload);
    console.log("RESULT", result);
    if (result.ok) {
      actions.setSubmitting(false);
      onClose();
      fetchEntries();
      setEntryToEdit({});
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    let answer = confirm('Eintrag löschen?')
    if (answer) {
      const result = await deleteRequest(`/api/time_entries/${id}`);
      console.log(result);
      if (result) fetchEntries()
    }
  };

  return (
    <Box>
      {/* <HStack h={"30px"}><Text>Platzhalter Filter</Text></HStack> */}
      <Box pt={4}>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Projekt</Th>
                <Th>Datum</Th>
                <Th>Zeit</Th>
                <Th>Phase</Th>
                <Th>Kommentar</Th>
                <Th pr={0} isNumeric>
                  Bearbeiten
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries && entries.length > 0
                ? entries.map((e, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>
                          {
                            projectOptions.find((p) => p.value === e.project)
                              .label
                          }
                        </Td>
                        <Td>{formatDateYYYYMMDD(e.date)}</Td>
                        <Td>{`${formatTime(e.hours)}:${formatTime(e.mins)}`}</Td>
                        <Td>
                          {phaseOptions.find((p) => p.value === e.phase).label}
                        </Td>
                        <Td>{e.comment}</Td>
                        <Td pr={0} isNumeric>
                          <HStack spacing={3} justify={"flex-end"} my={-2}>
                            <IconButton
                              variant="ghost"
                              colorScheme="blue"
                              size="xs"
                              aria-label="Bearbeiten"
                              icon={<EditIcon />}
                              onClick={() => {
                                setEntryToEdit(e);
                                onOpen();
                              }}
                            />
                            <IconButton
                              variant="ghost"
                              colorScheme="blue"
                              size="xs"
                              aria-label="Löschen"
                              icon={<DeleteIcon />}
                              onClick={() => {
                                handleDelete(e._id);
                              }}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {isOpen ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <Formik
            initialValues={{
              _id: entryToEdit._id,
              project: {
                value: entryToEdit.project,
                label: projectOptions.find(
                  (p) => p.value === entryToEdit.project
                ).label,
              },
              phase: {
                value: entryToEdit.phase,
                label: phaseOptions.find((p) => p.value === entryToEdit.phase)
                  .label,
              },
              date: entryToEdit.date,
              hours: entryToEdit.hours,
              mins: entryToEdit.mins,
              comment: entryToEdit.comment,
            }}
            onSubmit={(values, actions) => handleSave(values, actions)}
          >
            {(formikProps) => (
              <Form>
                <ModalContent fontFamily={"fontFamily"}>
                  <ModalHeader>Zeiteintrag bearbeiten</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
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
                          handleChange={(e) => {
                            formikProps.setFieldValue("project", e);
                          }}
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
                        <TextAreaInput
                          name={"comment"}
                          label={"Kommentar"}
                          value={formikProps.values.comment}
                          handleChange={(e) =>
                            formikProps.setFieldValue("comment", e.target.value)
                          }
                        />
                      </VStack>
                    </HStack>
                  </ModalBody>

                  <ModalFooter>
                    <Button mr={2} size="sm" variant="ghost">
                      Schließen
                    </Button>
                    <Button
                      size="sm"
                      color="white"
                      bgColor={"brand.700"}
                      mr={3}
                      type="submit"
                    >
                      Speichern
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </Box>
  );
};
