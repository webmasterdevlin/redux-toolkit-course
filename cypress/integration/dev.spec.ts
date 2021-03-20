/// <reference types="Cypress"/>

describe("Dev", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should match URL to /anti-heroes", () => {
    cy.get("[data-testid=nav-anti-heroes]").click();
    cy.location("pathname").should("equal", "/anti-heroes");
  });

  it("should get the title of the anti-heroes page" + ".", () => {
    cy.get("[data-testid=nav-anti-heroes]").click();
    cy.get("[data-testid=title-page]").contains("Anti-Heroes Page");
  });

  it("should get the title of heroes page", () => {
    cy.get("[data-testid=nav-heroes]").click();
    cy.get("[data-testid=title-page]").contains("Super Heroes Page");
  });
});
