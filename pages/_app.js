import "../styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import NavbarComponent from "../components/navbar";
import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <ChakraProvider>
      <Box bg="#F0EEED" h="100%">
        <NavbarComponent />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
    </Provider>
  );
}
