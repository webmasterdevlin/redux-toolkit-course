import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureAppStore } from "./store/configureStore";
import NavigationBar from "components/NavigationBar";

import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import EagerRoutes from "./EagerRoutes";
import LazyRoutes from "./LazyRoutes";

export const store = configureAppStore();

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline>
        <BrowserRouter>
          <>
            <NavigationBar />
            <Container>
              <LazyRoutes />
            </Container>
          </>
        </BrowserRouter>
      </CssBaseline>
    </Provider>
  );
};
export default App;
