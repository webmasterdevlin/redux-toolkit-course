import { render, screen } from "test-utils/testing-library-utils";
import HomePage from "../../pages/HomePage";

it("Navigation menus are present", () => {
  render(<HomePage />);

  const antiHeroes = screen.getByRole(/button/i, { name: "Anti Heroes" });
  expect(antiHeroes).toHaveTextContent(/anti heroes/i);

  const heroes = screen.getByRole(/button/i, { name: "Heroes" });
  expect(heroes).toHaveTextContent(/heroes/i);

  const villains = screen.getByRole(/button/i, { name: "Villains" });
  expect(villains).toHaveTextContent(/villains/i);
});
