/// <reference types="Cypress"/>

import "@cypress/code-coverage/support";
import "@percy/cypress";
import "@bahmutov/cy-api/support";
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("fetchHeroes", () => {
  cy.intercept("GET", "/heroes", {
    statusCode: 200,
    body: [
      {
        id: "7ggew732dw",
        firstName: "Barry",
        lastName: "Allen",
        house: "DC",
        knownAs: "Flash",
      },
      {
        id: "1ggew732dw",
        firstName: "Scott",
        lastName: "Summer",
        house: "Marvel",
        knownAs: "Cyclopes",
      },
    ],
  });
});

Cypress.Commands.add("fetchAntiHeroes", () => {
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
  });
});

Cypress.Commands.add("fetchVillains", () => {
  cy.intercept("GET", "/villains", {
    statusCode: 200,
    body: [
      {
        firstName: "Lex",
        lastName: "Luther",
        house: "DC",
        knownAs: "Lex",
        id: "3290fhe",
      },
      {
        firstName: "Max",
        lastName: "Eisenhardt",
        house: "Marvel",
        knownAs: "Magneto",
        id: "6r8finlfy",
      },
    ],
  });
});
