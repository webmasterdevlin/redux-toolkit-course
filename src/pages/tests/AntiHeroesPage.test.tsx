import { render, screen, waitFor } from "test-utils/testing-library-utils";
import AntiHeroesPage from "../AntiHeroesPage";

describe("Anti Heroes Page", () => {
  it("should render title", () => {
    render(<AntiHeroesPage />);

    const title = screen.getByRole("heading", { name: "Anti HeroesPage" });
    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<AntiHeroesPage />);

    const loading = screen.getByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should save character button be in disabled", () => {
    render(<AntiHeroesPage />);

    const saveCharacterButton = screen.getByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of anti heroes in main content and navigation bar", async () => {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(6);
      expect(screen.queryByRole("total-anti-heroes")).toHaveTextContent("6");
    });
  });
});
