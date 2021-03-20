/// <reference types="cypress"/>

describe("Rows of Villains", () => {
  beforeEach(() => {
    cy.fetchVillains();
    cy.visit("/");
    cy.get("[data-testid=nav-villains]").click();
  });

  it("should render villains", () => {
    cy.get("[data-testid=card]").should("have.length", 2);
  });
});
