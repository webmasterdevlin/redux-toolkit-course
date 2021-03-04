import { render, screen } from "test-utils/testing-library-utils";
import AntiHeroesPage from "../AntiHeroesPage";
import { configureAppStore } from "store/configureStore";
import { getAntiHeroesAction } from "../../features/antiHeroes/antiHeroAsyncActions";

describe("Anti Heroes Page", () => {
  const store = configureAppStore();

  it("should AntiHeroesPage's title is visible", () => {
    render(<AntiHeroesPage />);

    const title = screen.getByRole("heading", { name: "Anti HeroesPage" });
    expect(title).toBeInTheDocument();
  });

  it("should Anti heroes loading", async () => {
    render(<AntiHeroesPage />);

    const loading = screen.getByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should dispatch getAntiHeroesAction", async () => {
    await store.dispatch(getAntiHeroesAction());
    let state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(6);
  });
});
