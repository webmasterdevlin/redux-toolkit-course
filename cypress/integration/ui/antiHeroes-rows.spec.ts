/// <reference types="Cypress"/>

describe("Rows of Anti Heroes", () => {
  beforeEach(() => {
    cy.intercept("GET", "/anti-heroes", {
      statusCode: 200,
      body: [
        {
          id: "4893hfwuig",
          firstName: "Eddy",
          lastName: "Brock",
          house: "Marvel",
          knownAs: "Venom",
        },
        {
          id: "9greg7t767g",
          firstName: "Wade",
          lastName: "Wilson",
          house: "Marvel",
          knownAs: "Deadpool",
        },
      ],
    }).as("loadData");

    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=nav-anti-heroes]").click();
  });

  it("should render anti heroes", () => {
    cy.get("[data-testid=card]").should("have.length", 2);
  });
});
