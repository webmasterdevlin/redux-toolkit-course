import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
// Import your own reducer
import { initialState as reducerInitialState } from "../features/antiHeroes/antiHeroSlice";
import { configureAppStore } from "../store/configureStore";

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = configureAppStore(),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
