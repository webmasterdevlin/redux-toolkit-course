import { render, screen } from "test-utils/testing-library-utils";
import VillainsPage from "../VillainsPage";

test("HeroesPage's title is visible", () => {
  render(<VillainsPage />);

  const title = screen.getByRole("heading", { name: "Super VillainsPage" });

  expect(title).toBeInTheDocument();
});
