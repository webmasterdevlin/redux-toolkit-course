import { ReactElement, ReactNode } from "react";
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import NavigationBar from "components/NavigationBar";
import { configureAppStore } from "store/configureStore";
import { EnhancedStore } from "@reduxjs/toolkit";

type ReduxRenderOptions = {
  store?: EnhancedStore;
  renderOptions?: Omit<RenderOptions, "wrapper">;
};

const render = (
  ui: ReactElement,
  { store = configureAppStore(), ...renderOptions }: ReduxRenderOptions = {}
): RenderResult => {
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    return (
      <Provider store={store}>
        <CssBaseline>
          <BrowserRouter>
            <NavigationBar />
            <Container>{children}</Container>
          </BrowserRouter>
        </CssBaseline>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
