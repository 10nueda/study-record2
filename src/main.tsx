import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoApp } from "./App";
import theme from "./utils/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <TodoApp />
    </ChakraProvider>
  </StrictMode>,
);
