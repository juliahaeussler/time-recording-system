import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { Frame } from "./pages/Frame.jsx";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { PageNotFound } from "./pages/404";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./pages/helpers/ProtectedRoute";
import { TimeTrack } from "./pages/TimeTrack";
import { Impressum } from "./pages/Impressum";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "kontakt",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "impressum",
        element: <Impressum />,
      },
      {
        path: "zeiterfassung",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <TimeTrack />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
