import { Box, Text, Heading, VStack } from "@chakra-ui/react";

export const Impressum = () => {
  return (
    <VStack align="start" pt={"45px"}>
      <Text as="b" fontSize="xl" mb={3}>
        Impressum
      </Text>
      <Text as="b" fontSize="lg" mb={3}>
        Angaben gemäß § 5 TMG
      </Text>

      <Text fontSize="sm">
        Bernd Häußler
        <br />
        Dipl.-Ing. Architekt
        <br />
        Heinrich-Heine-Weg 19a
        <br />
        30880 Laatzen
      </Text>

      <Text as="b" fontSize="lg">
        Kontakt
      </Text>
      <Text fontSize="sm">
        Telefon: +49 (0) 170 8209703
        <br />
        E-Mail: architekt@haeuszler.de
      </Text>

      <Text as="b" fontSize="lg">
        Umsatzsteuer-ID
      </Text>
      <Text fontSize="sm">
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        DE68407591383
      </Text>

      <Text as="b" fontSize="lg">
        Berufsbezeichnung und berufsrechtliche Regelungen
      </Text>
      <Text fontSize="sm">
        Berufsbezeichnung:
        <br />
        Architekt
      </Text>
      <Text fontSize="sm">
        Zuständige Kammer:
        <br />
        Architektenkammer Niedersachsen
        <br />
        Körperschaft des öffentlichen Rechts
        <br />
        Laveshaus
        <br />
        Friedrichswall 5<br />
        30159 Hannover
      </Text>
      <Text fontSize="sm">
        Verliehen in:
        <br />
        Deutschland
      </Text>

      <Text as="b" fontSize="lg">
        Angaben zur Berufshaftpflichtversicherung
      </Text>
      <Text fontSize="sm">
        <strong>Name und Sitz des Versicherers:</strong>
        <br />
        VHV Allgemeine Versicherung AG
        <br />
        VHV-Platz 1<br />
        30177 Hannover
      </Text>

      <Text fontSize="sm">
        <strong>Geltungsraum der Versicherung:</strong>
        <br />
        Deutschland
      </Text>

      <Text as="b" fontSize="lg">
        Verbraucherstreitbeilegung/Universalschlichtungsstelle
      </Text>
      <Text fontSize="sm">
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </Text>
    </VStack>
  );
};
