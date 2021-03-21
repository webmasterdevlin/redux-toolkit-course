/// <reference types="cypress"/>

import { VILLAINS } from "../../../src/mocks/handlers/villainHandler";

describe("Anti-Heroes Page", () => {
  beforeEach(() => {
    cy.fetchAntiHeroes();
    cy.visit("/");
    cy.get("[data-testid=nav-villains]").click();

    // demo of writing aliases
    cy.get("[data-testid=firstName]").as("FirstName");
    cy.get("[data-testid=lastName]").as("LastName");
    cy.get("[data-testid=house]").as("House");
    cy.get("[data-testid=knownAs]").as("KnownAs");
    cy.get("[data-testid=save-character]").as("Save");
  });

  it("should render villains", () => {
    cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked a villain after clicking a mark button", () => {
      cy.findAllByTestId("mark-button").eq(1).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove a villain from the store after clicking a remove button", () => {
      cy.get("[data-testid=remove-button]").eq(1).click();
      cy.get("[data-testid=card]").should("have.length", 1);
    });

    it("should delete a villain from the database after clicking a delete-from-db button", () => {
      cy.get("[data-testid=delete-button]").eq(1).click();
    });
  });

  context("Save Button", () => {
    it("should add a new villain", () => {
      cy.get("@FirstName").type("Bucky");
      cy.get("@LastName").type("Barnes");
      cy.get("@House").type("Marvel");
      cy.get("@KnownAs").type("The Winter Soldier");
      cy.get("@Save").click();

      cy.findAllByTestId("card").should("have.length", VILLAINS.length + 1);
      cy.findByTestId("total-villains").contains(VILLAINS.length + 1);
    });
  });
});
