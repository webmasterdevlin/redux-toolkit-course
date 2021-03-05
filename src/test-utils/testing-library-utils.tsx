import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
// Import your own reducer
import { initialState as reducerInitialState } from "../features/antiHeroes/antiHeroSlice";
import { configureAppStore } from "../store/configureStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = configureAppStore(),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <CssBaseline>
          <BrowserRouter>
            <>
              <NavigationBar />
              {children}
            </>
          </BrowserRouter>
        </CssBaseline>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
