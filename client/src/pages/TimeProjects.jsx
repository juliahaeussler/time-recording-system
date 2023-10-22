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
  VStack,
  IconButton,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { TextAreaInput, TextInput } from "../helpers/inputs";
import {
  postRequest,
  putRequest,
  formatDateYYYYMMDD,
  deleteRequest,
  getRequest,
  formatTime,
  getTimeSum,
  getTimeDiff,
} from "../helpers/functions";
import { useState } from "react";
import { createPdf } from "./helpers/docgen";

export const TimeProjects = ({ projects, fetchProjects, phaseOptions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToPrint, setProjectToPrint] = useState(null);
  const [radioValue, setRadioValue] = useState("view");
  const [downloading, setDownloading] = useState(false);

  const handleSave = async (values, actions) => {
    actions.setSubmitting(true);
    const result = values._id
      ? await putRequest(`/api/projects/${values._id}`, values)
      : await postRequest("/api/projects", values);
    if (result.ok) {
      actions.setSubmitting(false);
      onClose();
      fetchProjects();
      setProjectToEdit({});
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    let answer = confirm(
      "Projekt löschen? Achtung: alle Zeiteinträge zu diesem Projekt werden gelöscht!"
    );
    if (answer) {
      const result = await deleteRequest(`/api/projects/${id}`);
      if (result) fetchProjects();
    }
  };

  const handlePdfCreation = async () => {
    setDownloading(true);
    const data = await getRequest(
      `/api/time_entries?projectId=${projectToPrint._id}`
    );

    const entries = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const totalTime = getTimeSum(entries);

    const entryData = entries.map((e) => {
      return [
        formatDateYYYYMMDD(e.date),
        phaseOptions.find((p) => p.value === e.phase).label,
        e.comment,
        `${formatTime(e.hours)}:${formatTime(e.mins)}`,
      ];
    });

    if (radioValue === "invoice") {
      const entriesOnInvoices = data.filter((e) => !e.invoice);
      const sum = getTimeSum(entriesOnInvoices);
      const newInvoicePayload = {
        project: projectToPrint._id,
        date: new Date(),
        hours: sum.hours,
        mins: sum.mins,
      };
      const invoiceResponse = await postRequest(
        "/api/invoices",
        newInvoicePayload
      );
      const newInvoice = await invoiceResponse.json();
      for (let i = 0; i < entriesOnInvoices.length; i++) {
        await putRequest(`/api/time_entries/${entriesOnInvoices[i]._id}`, {
          ...entriesOnInvoices[i],
          invoice: newInvoice._id,
        });
      }
    }

    const allInvoicesOnProject = await getRequest(
      `/api/invoices?projectId=${projectToPrint._id}`
    );

    entryData.push([
      "",
      "",
      "Summe",
      `${formatTime(totalTime.hours)}:${formatTime(totalTime.mins)}`,
    ]);

    if (allInvoicesOnProject.length > 1) {
      allInvoicesOnProject.pop();
      allInvoicesOnProject.map((i, idx) => {
        return entryData.push([
          "",
          "",
          `abzgl. ${idx + 1}. AR. vom ${formatDateYYYYMMDD(i.date)}`,
          `./. ${formatTime(i.hours)}:${formatTime(i.mins)}`,
        ]);
      });

      const sumOfAllInvoices = getTimeSum(allInvoicesOnProject);
      const remainingSum = getTimeDiff(totalTime, sumOfAllInvoices);

      entryData.push([
        "",
        "",
        "Summe",
        `${formatTime(remainingSum.hours)}:${formatTime(remainingSum.mins)}`,
      ]);
    }

    const payload = {
      project: projectToPrint.name,
      entries: entryData,
      timeframe: `${formatDateYYYYMMDD(entries[0].date)} - ${formatDateYYYYMMDD(
        entries[entries.length - 1].date
      )}`,
    };

    await createPdf(payload);
    setDownloading(false);
    setProjectToPrint(null);
    onClose();
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
                        <Td>{p.date ? formatDateYYYYMMDD(p?.date) : ""}</Td>
                        <Td>{p.note}</Td>
                        <Td pr={0} isNumeric>
                          <IconButton
                            variant="ghost"
                            colorScheme="blue"
                            size="xs"
                            aria-label="Bearbeiten"
                            icon={<DownloadIcon />}
                            onClick={() => {
                              setProjectToPrint(p);
                              onOpen();
                            }}
                          />
                          <IconButton
                            variant="ghost"
                            colorScheme="blue"
                            size="xs"
                            onClick={() => {
                              setProjectToEdit(p);
                              onOpen();
                            }}
                            aria-label="Edit project"
                            icon={<EditIcon />}
                          />
                          <IconButton
                            variant="ghost"
                            colorScheme="blue"
                            size="xs"
                            aria-label="Löschen"
                            icon={<DeleteIcon />}
                            onClick={() => {
                              handleDelete(p._id);
                            }}
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

      {isOpen ? (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setProjectToEdit(null);
            setProjectToPrint(null);
          }}
        >
          <ModalOverlay />
          {projectToPrint ? (
            <ModalContent>
              <ModalHeader>Projektauswertung erstellen</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <RadioGroup onChange={setRadioValue} value={radioValue}>
                  <Stack spacing={5} direction="column">
                    <Radio value="invoice">Zur Rechnungserstellung</Radio>
                    <Radio value="view">Zur Ansicht</Radio>
                  </Stack>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  mr={2}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    onClose();
                    setProjectToEdit(null);
                  }}
                >
                  Schließen
                </Button>
                <Button
                  onClick={handlePdfCreation}
                  size="sm"
                  color="white"
                  bgColor={"brand.700"}
                  type="submit"
                  isLoading={downloading}
                >
                  Download
                </Button>
              </ModalFooter>
            </ModalContent>
          ) : (
            <Formik
              initialValues={
                projectToEdit
                  ? {
                      _id: projectToEdit._id || "",
                      name: projectToEdit.name || "",
                      number: projectToEdit.number || "",
                      date: projectToEdit.date || "",
                      note: projectToEdit.note || "",
                    }
                  : {
                      _id: "",
                      name: "",
                      number: "",
                      date: "",
                      note: "",
                    }
              }
              onSubmit={(values, actions) => handleSave(values, actions)}
            >
              {(formikProps) => (
                <Form>
                  <ModalContent fontFamily={"fontFamily"}>
                    <ModalHeader>
                      {projectToEdit
                        ? "Projekt bearbeiten"
                        : "Neues Projekt hinzufügen"}
                    </ModalHeader>
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
                              formikProps.setFieldValue(
                                "number",
                                e.target.value
                              )
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
                        type="submit"
                      >
                        Speichern
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Form>
              )}
            </Formik>
          )}
        </Modal>
      ) : null}
    </Box>
  );
};
