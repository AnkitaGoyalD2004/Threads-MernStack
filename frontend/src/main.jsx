import { ChakraProvider } from "@chakra-ui/react"; // A provider component that wraps
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
//the application to give access to Chakra UI's theming capabilities.
import { ColorModeScript } from "@chakra-ui/color-mode";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { RecoilRoot } from 'recoil';
const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode("gray.100", '#101010')(props),
    }
  })
}
const config = {
  initialColorMode: "dark",
  useSystemColorModel: true
}

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({ config, styles, colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  //  <React.StrictMode> renders every component twice on development
   <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
   </React.StrictMode>
)
