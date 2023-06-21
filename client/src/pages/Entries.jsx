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
  Text,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

// projectName: "",
// projectId: "",
// //set default input value to current date: (in format yyyy-mm-dd)
// date: new Date().toISOString().split("T")[0],
// timespanHours: "",
// timespanMins: "00",
// servicePhase: "",
// comment: "",

export const TimeEntries = () => {
  return (
    <Box>
      <HStack h={"30px"}>
        <Text>Platzhalter Filter</Text>
      </HStack>
      <Box pt={4}>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th pl={0}>Eintrag ID</Th>
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
              <Tr>
                <Td pl={0}>123</Td>
                <Td>Projekt 1</Td>
                <Td>02.04.23</Td>
                <Td>04:00</Td>
                <Td>7. Mitwirkung bei der Vergabe / Kostenanschlag</Td>
                <Td>gearbeitet</Td>
                <Td pr={0} isNumeric>
                  <HStack spacing={3} justify={"flex-end"} my={-2}>
                    <IconButton
                      variant="ghost"
                      colorScheme="blue"
                      size="xs"
                      aria-label="Bearbeiten"
                      icon={<EditIcon />}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="blue"
                      size="xs"
                      aria-label="Löschen"
                      icon={<DeleteIcon />}
                    />
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
