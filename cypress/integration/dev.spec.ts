/// <reference types="Cypress"/>

describe("Dev", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should match URL to /anti-heroes", () => {
    cy.get("[data-cy=nav-anti-heroes]").click();
    cy.location("pathname").should("equal", "/anti-heroes");
  });

  it("should get the title of the anti-heroes page", () => {
    const antiHeroesLink = cy.get("[data-cy=nav-anti-heroes]");
    antiHeroesLink.click();

    const title = cy.get("[data-cy=title-page]");
    title.contains("Anti-Heroes Page");
  });

  it("should get the title of heroes page", () => {
    const heroesLink = cy.get("[data-cy=nav-heroes]");
    heroesLink.click();

    const title = cy.get("[data-cy=title-page]");
    title.contains("Super Heroes Page");
  });
});
