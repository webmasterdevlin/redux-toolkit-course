/// <reference types="cypress"/>

describe("Anti-Heroes Page", () => {
  beforeEach(() => {
    cy.fetchAntiHeroes();
    cy.visit("/");
    cy.get("[data-testid=nav-anti-heroes]").click();
  });

  it("should render anti heroes", () => {
    cy.get("[data-testid=card]").should("have.length", 2);
  });

  context("Buttons", () => {
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
      cy.get("[data-testid=delete-button]").eq(1).click();
    });
  });
});
