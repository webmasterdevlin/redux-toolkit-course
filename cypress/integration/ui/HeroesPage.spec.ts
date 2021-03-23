/// <reference types="cypress"/>

import { HEROES } from "../../../src/mocks/handlers/heroHandler";

describe("Heroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/heroes", HEROES);
    cy.deleteCommand("/heroes/*");
    cy.NavigateByTestIdCommand("nav-heroes");
    cy.SetupInputFieldsCommand();
  });

  it("should render heroes", () => {
    cy.get("[data-testid=card]").should("have.length", HEROES.length);
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
      cy.get("[data-testid=card]").should("have.length", HEROES.length - 1);
    });

    it("should delete a hero from the database after clicking a delete-from-db button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length - 1);
    });
  });

  context("Save Button", () => {
    it("should add a new hero", () => {
      const firstName = "Bruce";
      const lastName = "Wayne";
      const house = "DC";
      const knownAs = "Batman";

      cy.get("@FirstName").type(firstName);
      cy.get("@LastName").type(lastName);
      cy.get("@House").type(house);
      cy.get("@KnownAs").type(knownAs);

      cy.postCommand("/heroes", {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@Save").click();

      cy.findAllByTestId("card").should("have.length", HEROES.length + 1);
      cy.findByTestId("total-heroes").contains(HEROES.length + 1);
    });
  });
});
