import { render, screen, waitFor } from "test-utils/testing-library-utils";

import HeroesPage from "pages/HeroesPage";
import { getHeroesAction } from "features/heroes/heroAsyncActions";
import { store } from "App";

describe("Heroes Heroes Page", () => {
  it("should HeroesPage's title is visible", () => {
    render(<HeroesPage />);

    const title = screen.getByRole("heading", { name: "Super HeroesPage" });
    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
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

  it("should show exact number of heroes in main content and navigation bar", async () => {
    render(<HeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(5);
      expect(screen.queryByRole("total-heroes")).toHaveTextContent("5");
    });
  });
});
