import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  //auth logic
  return (
    <Box>
      <Outlet />
    </Box>
  );
};