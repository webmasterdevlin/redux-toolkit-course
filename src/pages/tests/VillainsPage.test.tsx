import { render, screen, waitFor } from "test-utils/testing-library-utils";

import VillainsPage from "pages/VillainsPage";
import { getVillainsAction } from "features/villains/villainAsyncActions";
import { store } from "App";

describe("Villains Heroes Page", () => {
  it("should VillainsPage's title is visible", () => {
    render(<VillainsPage />);

    const title = screen.getByRole("heading", { name: "Super VillainsPage" });
    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<VillainsPage />);

    const loading = screen.getByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should dispatch getVillainsAction", async () => {
    await store.dispatch(getVillainsAction());
    let state = store.getState().villain;
    expect(state.villains).toHaveLength(4);
  });

  it("should save character button be in disabled", () => {
    render(<VillainsPage />);

    const saveCharacterButton = screen.getByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of villains in main content and navigation bar", async () => {
    render(<VillainsPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(4);
      expect(screen.queryByRole("total-villains")).toHaveTextContent("4");
    });
  });
});
