/// <reference types="cypress"/>

describe("Rows of Anti Heroes", () => {
  beforeEach(() => {
    cy.fetchAntiHeroes();
    cy.visit("/");
    cy.get("[data-testid=nav-anti-heroes]").click();
  });

  it("should render anti heroes", () => {
    cy.get("[data-testid=card]").should("have.length", 2);
  });
});
