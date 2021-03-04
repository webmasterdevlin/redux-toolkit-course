import { render, screen } from "test-utils/testing-library-utils";
import { configureAppStore } from "store/configureStore";
import VillainsPage from "../VillainsPage";
import { getVillainsAction } from "../../features/villains/villainAsyncActions";

describe("Villains Heroes Page", () => {
  const store = configureAppStore();

  it("should VillainsPage's title is visible", () => {
    render(<VillainsPage />);

    const title = screen.getByRole("heading", { name: "Super VillainsPage" });
    expect(title).toBeInTheDocument();
  });

  it("should Villains loading is visible", async () => {
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
});
