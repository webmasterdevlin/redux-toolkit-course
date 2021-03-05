import { render, screen } from "test-utils/testing-library-utils";
import { configureAppStore } from "store/configureStore";
import HeroesPage from "../HeroesPage";
import { getHeroesAction } from "../../features/heroes/heroAsyncActions";

describe("Heroes Heroes Page", () => {
  const store = configureAppStore();

  it("should HeroesPage's title is visible", () => {
    render(<HeroesPage />);

    const title = screen.getByRole("heading", { name: "Super HeroesPage" });
    expect(title).toBeInTheDocument();
  });

  it("should Heroes' loading is visible", async () => {
    render(<HeroesPage />);

    const loading = screen.getByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should dispatch getHeroesAction", async () => {
    await store.dispatch(getHeroesAction());
    let state = store.getState().hero;
    expect(state.heroes).toHaveLength(5);
  });

  it("should save character button be in disabled", () => {
    render(<HeroesPage />);

    const saveCharacterButton = screen.getByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });
});
