/// <reference types="cypress"/>

import { ANTI_HEROES } from "../../../src/mocks/handlers/antiHeroHandler";

describe("Anti-Heroes Page", () => {
  beforeEach(() => {
    cy.getAntiHeroesCommand();
    cy.deleteAntiHeroCommand();
    cy.visit("/");
    cy.get("[data-testid=nav-anti-heroes]").click();

    // demo of writing aliases
    cy.get("[data-testid=firstName]").as("FirstName");
    cy.get("[data-testid=lastName]").as("LastName");
    cy.get("[data-testid=house]").as("House");
    cy.get("[data-testid=knownAs]").as("KnownAs");
    cy.get("[data-testid=save-character]").as("Save");
  });

  it("should render anti heroes", () => {
    cy.get("[data-testid=card]").should("have.length", ANTI_HEROES.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked an anti hero after clicking a mark button", () => {
      cy.findAllByTestId("mark-button").eq(1).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove an anti hero from the store after clicking a remove button", () => {
      cy.get("[data-testid=remove-button]").eq(1).click();
      cy.get("[data-testid=card]").should("have.length", 1);
    });

    it("should delete an anti hero from the database after clicking a delete-from-db button", () => {
      const antiHero = cy.get("[data-testid=delete-button]").eq(1);
      antiHero.click();
    });
  });

  context.skip("Save Button", () => {
    it("should add a new anti hero", () => {
      cy.get("@FirstName").type("Bucky");
      cy.get("@LastName").type("Barnes");
      cy.get("@House").type("Marvel");
      cy.get("@KnownAs").type("The Winter Soldier");
      cy.get("@Save").click();

      cy.findAllByTestId("card").should("have.length", ANTI_HEROES.length + 1);
      cy.findByTestId("total-anti-heroes").contains(ANTI_HEROES.length + 1);
    });
  });
});
