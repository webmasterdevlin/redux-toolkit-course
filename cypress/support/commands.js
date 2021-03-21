/// <reference types="Cypress"/>

import "@cypress/code-coverage/support";
import "@percy/cypress";
import "@bahmutov/cy-api/support";
import "@testing-library/cypress/add-commands";
import { ANTI_HEROES } from "../../src/mocks/handlers/antiHeroHandler";

Cypress.Commands.add("fetchHeroes", () => {
  cy.intercept("GET", "/heroes/*", {
    statusCode: 200,
    body: ANTI_HEROES,
  });
});

Cypress.Commands.add("fetchAntiHeroes", () => {
  cy.intercept("GET", "/anti-heroes/*", {
    statusCode: 200,
    body: ANTI_HEROES,
  });
});

Cypress.Commands.add("fetchVillains", () => {
  cy.intercept("GET", "/villains/*", {
    statusCode: 200,
    body: ANTI_HEROES,
  });
});
