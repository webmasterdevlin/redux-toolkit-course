import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

it("should welcome message is visible", () => {
  render(<HomePage />);

  const title = screen.getByRole("heading", {
    name: "Welcome to Redux Toolkit Course 🧑‍🏫 💻",
  });

  expect(title).toBeInTheDocument();
});
