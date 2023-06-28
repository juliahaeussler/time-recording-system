import { Box } from "@chakra-ui/react";
import Bild1 from "../images/Bild1.jpg";

export const Home = () => {
  return (
    <Box
      mr={-4}
      ml={-4}
      mb={-4}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${Bild1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    ></Box>
  );
};
