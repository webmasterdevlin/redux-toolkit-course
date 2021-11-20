import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureAppStore } from "./store/configureStore";
import NavigationBar from "components/NavigationBar";

import LazyRoutes from "./LazyRoutes";
import { Container, CssBaseline } from "@mui/material";

export const store = configureAppStore();

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline>
        <BrowserRouter>
          <NavigationBar />
          <Container>
            <LazyRoutes />
          </Container>
        </BrowserRouter>
      </CssBaseline>
    </Provider>
  );
};
export default App;
