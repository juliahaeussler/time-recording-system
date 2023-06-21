import {
  Box,
  Button,
  HStack,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack, IconButton
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { TextAreaInput, TextInput } from "../helpers/inputs";
import { getRequest, postRequest, putRequest } from "../helpers/functions";
import { useCallback, useEffect, useState } from "react";

export const TimeProjects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState({});

  const fetchProjects = useCallback(async () => {
    const result = await getRequest("/api/projects");
    setProjects(result);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async (values, actions) => {
    actions.setSubmitting(true);
    const result = values._id
      ? await putRequest(`/api/projects/${values._id}`, values)
      : await postRequest("/api/projects", values);
    if (result.ok) {
      actions.setSubmitting(false);
      onClose();
      fetchProjects();
      setProjectToEdit({})
    }
  };

  return (
    <Box>
      <HStack h={"30px"}>
        {/* <Text>Filters</Text> */}
        <Spacer />
        <Button color="white" bgColor={"brand.700"} size="sm" onClick={onOpen}>
          Neues Projekt
        </Button>
      </HStack>

      <Box pt={4}>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th pl={0}>Projekt</Th>
                <Th>Nummer</Th>
                <Th>Datum</Th>
                <Th>Info</Th>
                <Th pr={0} isNumeric>
                  Bearbeiten
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects && projects.length > 0
                ? projects.map((p, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td pl={0}>{p.name}</Td>
                        <Td>{p.number}</Td>
                        <Td>{p.date}</Td>
                        <Td>{p.note}</Td>
                        <Td pr={0} isNumeric>
                          <IconButton
                            variant="link" onClick={() => {setProjectToEdit(p); onOpen()}}
                            aria-label="Edit project"
                            icon={<EditIcon />}
                          />
                        </Td>
                      </Tr>
                    );
                  })
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            _id: projectToEdit._id,
            name: projectToEdit.name,
            number: projectToEdit.number,
            date: projectToEdit._date,
            note: projectToEdit.note,
          }}
          onSubmit={(values, actions) => handleSave(values, actions)}
        >
          {(formikProps) => (
            <Form>
              <ModalContent fontFamily={"fontFamily"}>
                <ModalHeader>Neues Projekt hinzufügen</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <VStack>
                      <TextInput
                        name="name"
                        label="Projektname"
                        handleChange={(e) =>
                          formikProps.setFieldValue("name", e.target.value)
                        }
                        value={formikProps.values.name}
                      />
                      <TextInput
                        name="number"
                        label="Nummer"
                        handleChange={(e) =>
                          formikProps.setFieldValue("number", e.target.value)
                        }
                        value={formikProps.values.number}
                      />
                      <TextInput
                        name="date"
                        label="Datum"
                        handleChange={(e) =>
                          formikProps.setFieldValue("date", e.target.value)
                        }
                        value={formikProps.values.date}
                      />
                      <TextAreaInput
                        name={"note"}
                        label={"Notiz"}
                        handleChange={(e) =>
                          formikProps.setFieldValue("note", e.target.value)
                        }
                        value={formikProps.values.note}
                      />
                    </VStack>
                  </Box>
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
    </Box>
  );
};
