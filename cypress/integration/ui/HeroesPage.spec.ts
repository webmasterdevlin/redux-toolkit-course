/// <reference types="cypress"/>

import { heroesFixture } from "../../../src/mocks/handlers/heroHandler";
import { HeroModel } from "../../../src/features/heroes/heroTypes";

const url = "/api/heroes";

describe("Heroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand(url, heroesFixture);
    cy.deleteCommand(`${url}/*`);
    cy.NavigateByTestIdCommand("nav-heroes");
    cy.SetupInputFieldsCommand();
  });

  it("should render heroes", () => {
    cy.get("[data-testid=card]").should("have.length", heroesFixture.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked a hero after clicking a mark button", () => {
      const index = 1;
      cy.findAllByTestId("mark-button").eq(index).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove a hero from the store after clicking a remove button", () => {
      const index = 1;
      cy.get("[data-testid=remove-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        heroesFixture.length - 1
      );
    });

    it("should delete a hero from the database after clicking a delete-from-db button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        heroesFixture.length - 1
      );
    });
  });

  context("Save Button", () => {
    it("should add a new hero", () => {
      cy.fixture<HeroModel>("character").then(
        ({ firstName, lastName, house, knownAs }) => {
          cy.get("@FirstName").type(firstName);
          cy.get("@LastName").type(lastName);
          cy.get("@House").type(house);
          cy.get("@KnownAs").type(knownAs);

          cy.postCommand(url, {
            firstName,
            lastName,
            house,
            knownAs,
          });
        }
      );

      cy.get("@Save").click();

      cy.findAllByTestId("card").should(
        "have.length",
        heroesFixture.length + 1
      );
      cy.findByTestId("total-heroes").contains(heroesFixture.length + 1);
    });
  });

  context("Refetch", () => {
    it("should refetch all heroes after soft deleting all heroes", () => {
      cy.get("[data-testid=remove-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", heroesFixture.length);
      cy.get("[data-testid=total-heroes]").contains(heroesFixture.length);
    });

    it("should refetch all heroes after deleting all heroes", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", heroesFixture.length);
      cy.get("[data-testid=total-heroes]").contains(heroesFixture.length);
    });
  });
});
