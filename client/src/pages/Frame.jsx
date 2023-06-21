import { Box, HStack, Spacer } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <HStack
      w={"100%"}
      h={"50px"}
      position={"sticky"}
      px={"15px"}
      spacing={4}
      bgColor={"brand.900"}
      color={"white"}
    >
      <NavLink to={"/home"}>Architekt</NavLink>
      <NavLink to={"/projekte"}>Projekte</NavLink>
      <Spacer />
      <NavLink to={"/kontakt"}>Kontakt</NavLink>
      <NavLink to={"/login"}>Log in</NavLink>
      <NavLink to={"/zeiterfassung"}>Zeiterfassung (kommt weg)</NavLink>
    </HStack>
  );
};

export const Frame = () => {
  return (
    <Box fontFamily={"fontFamily"}>
      <Navbar />
      <Box m={4}><Outlet /></Box>
    </Box>
  );
};
