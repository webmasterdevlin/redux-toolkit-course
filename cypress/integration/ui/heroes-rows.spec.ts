/// <reference types="cypress"/>

describe("Rows of Heroes", () => {
  beforeEach(() => {
    cy.fetchHeroes();
    cy.visit("/");
    cy.get("[data-testid=nav-heroes]").click();
  });

  it("should render heroes", () => {
    cy.get("[data-testid=card]").should("have.length", 2);
  });
});
