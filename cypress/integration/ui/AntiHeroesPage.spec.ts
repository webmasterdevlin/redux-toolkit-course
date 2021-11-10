/// <reference types="cypress"/>

import { antiHeroesFixture } from "../../../src/mocks/handlers/antiHeroHandler";

const url = "/api/anti-heroes";

describe("Anti-Heroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand(url, antiHeroesFixture);
    cy.deleteCommand(`${url}/*`);
    cy.NavigateByTestIdCommand("nav-anti-heroes");
    cy.SetupInputFieldsCommand();
  });

  it("should render anti heroes", () => {
    cy.get("[data-testid=card]").should(
      "have.length",
      antiHeroesFixture.length
    );
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked an anti hero after clicking a mark button", () => {
      const index = 1;
      cy.findAllByTestId("mark-button").eq(index).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove an anti hero from the store after clicking a remove button", () => {
      const index = 1;
      cy.get("[data-testid=remove-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        antiHeroesFixture.length - 1
      );
    });

    it("should delete an anti hero from the database after clicking a delete-from-db button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        antiHeroesFixture.length - 1
      );
    });
  });

  context("Save Button", () => {
    it("should add a new anti hero", () => {
      const firstName = "Bucky";
      const lastName = "Barnes";
      const house = "Marvel";
      const knownAs = "The Winter Soldier";

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

      cy.get("@Save").click();

      cy.findAllByTestId("card").should(
        "have.length",
        antiHeroesFixture.length + 1
      );
      cy.findByTestId("total-anti-heroes").contains(
        antiHeroesFixture.length + 1
      );
    });
  });

  context("Refetch", () => {
    it("should refetch all anti heroes after soft deleting all anti heroes", () => {
      cy.get("[data-testid=remove-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should(
        "have.length",
        antiHeroesFixture.length
      );
      cy.get("[data-testid=total-anti-heroes]").contains(
        antiHeroesFixture.length
      );
    });

    it("should refetch all anti heroes after deleting all anti heroes", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should(
        "have.length",
        antiHeroesFixture.length
      );
      cy.get("[data-testid=total-anti-heroes]").contains(
        antiHeroesFixture.length
      );
    });
  });
});
