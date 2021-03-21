import HeroesPage from "pages/HeroesPage";
import { store } from "App";
import { getHeroesAction } from "features/heroes/heroAsyncActions";
import { render, screen, waitFor } from "test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

describe("Heroes Page", () => {
  it("should render title", () => {
    render(<HeroesPage />);

    const title = screen.getByTestId("title-page");
    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<HeroesPage />);

    const loading = screen.getByTestId("loading");
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should dispatch getHeroesAction", async () => {
    await store.dispatch(getHeroesAction());
    let state = store.getState().hero;
    expect(state.heroes).toHaveLength(2);
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

    const cards = await screen.findAllByRole("card");
    expect(cards).toHaveLength(2);
    const counter = screen.getByTestId("total-heroes");
    expect(counter).toHaveTextContent("2");
  });

  it("should add new hero", async () => {
    const { rerender } = render(<HeroesPage />);

    const firstNameTextInput = await screen.findByLabelText("First Name");
    expect(firstNameTextInput).toBeInTheDocument();
    userEvent.type(firstNameTextInput, "Devlin");
    expect(firstNameTextInput).toHaveValue("Devlin");

    const lastNameTextInput = await screen.findByLabelText("Last Name");
    expect(lastNameTextInput).toBeInTheDocument();
    userEvent.type(lastNameTextInput, "Duldulao");
    expect(lastNameTextInput).toHaveValue("Duldulao");

    const houseTextInput = await screen.findByLabelText("House");
    expect(houseTextInput).toBeInTheDocument();
    userEvent.type(houseTextInput, "Marvel");
    expect(houseTextInput).toHaveValue("Marvel");

    const knownAsTextInput = await screen.findByLabelText("Known As");
    expect(knownAsTextInput).toBeInTheDocument();
    userEvent.type(knownAsTextInput, "React Man");
    expect(knownAsTextInput).toHaveValue("React Man");

    const saveCharacterButton = await screen.findByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeEnabled();
    userEvent.click(saveCharacterButton);

    rerender(<HeroesPage />);

    await waitFor(() => {
      const cards = screen.getAllByRole("card");
      expect(cards).toHaveLength(3);
      const counter = screen.getByTestId("total-heroes");
      expect(counter).toHaveTextContent("3");
    });
  });

  it("should delete a hero from the database", async () => {
    render(<HeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "DELETE in DB",
    });
    userEvent.click(buttons[0]);
    expect(screen.getByRole("card")).toBeInTheDocument();
    expect(screen.getByTestId("total-heroes")).toHaveTextContent("1");
  });

  it("should remove a hero from the store", async () => {
    render(<HeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "Remove",
    });
    userEvent.click(buttons[0]);
    expect(screen.getByRole("card")).toBeInTheDocument();
    expect(screen.getByTestId("total-heroes")).toHaveTextContent("1");
  });

  it("should mark a hero", async () => {
    render(<HeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "Mark",
    });
    expect(buttons).toHaveLength(2);
    userEvent.click(buttons[0]);
    const cards = await screen.findAllByRole("card");
    expect(cards[0]).toHaveTextContent("marked");
  });
});
