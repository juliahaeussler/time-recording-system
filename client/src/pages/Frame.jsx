import { Box, HStack, Spacer, Button, VStack } from "@chakra-ui/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../helpers/localStorage";
import { postRequest } from "../helpers/functions";

const Navbar = () => {
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const response = await postRequest("/api/login/logout");
    const result = await response.json();
    if (result.status === "ok") {
      window.localStorage.removeItem("user");
      navigate("/home");
    }
  };

  const getNavStyle = (isActive) => {
    return {
      fontWeight: isActive ? "bold" : "",
    };
  };

  return (
    <VStack
      as="header"
      position="fixed"
      w={"100%"}
      h={"50px"}
      p={0}
      mt={"-20px"}
    >
      <HStack
        h="50px"
        px="15px"
        w="100%"
        spacing={4}
        bgColor={"brand.900"}
        color={"white"}
      >
        <NavLink style={({ isActive }) => getNavStyle(isActive)} to={"/home"}>
          Architekt
        </NavLink>
        <NavLink
          style={({ isActive }) => getNavStyle(isActive)}
          to={"/kontakt"}
        >
          Kontakt
        </NavLink>
        <Spacer />
        {user ? (
          <>
            <NavLink
              style={({ isActive }) => getNavStyle(isActive)}
              to={"/zeiterfassung"}
            >
              Zeiterfassung
            </NavLink>
            <Button
              variant="link"
              color={"white"}
              onClick={() => handleLogOut()}
            >
              Log out
            </Button>
          </>
        ) : (
          <NavLink
            style={({ isActive }) => getNavStyle(isActive)}
            to={"/login"}
          >
            Log in
          </NavLink>
        )}
        <NavLink
          style={({ isActive }) => getNavStyle(isActive)}
          to={"/impressum"}
        >
          Impressum
        </NavLink>
      </HStack>
      <Box w="100%" h="3" bg={"brand.700"} mt={-3} />
    </VStack>
  );
};

export const Frame = () => {
  return (
    <Box fontFamily={"fontFamily"}>
      <Navbar />
      <Box m={4}>
        <Outlet />
      </Box>
    </Box>
  );
};
