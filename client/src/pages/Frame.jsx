import { Box, HStack, Spacer, Button } from "@chakra-ui/react";
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
      <NavLink to={"/kontakt"}>Kontakt</NavLink>
      <Spacer />
      {user ? (
        <>
          <NavLink to={"/zeiterfassung"}>Zeiterfassung</NavLink>
          <Button variant="link" color={"white"} onClick={() => handleLogOut()}>
            Log out
          </Button>
        </>
      ) : (
        <NavLink to={"/login"}>Log in</NavLink>
      )}
    </HStack>
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
