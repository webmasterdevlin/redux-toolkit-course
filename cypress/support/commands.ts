/// <reference types="Cypress"/>

import "@cypress/code-coverage/support";
import "@percy/cypress";
import "@bahmutov/cy-api/support";
import "@testing-library/cypress/add-commands";
import { ANTI_HEROES } from "../../src/mocks/handlers/antiHeroHandler";
import { HEROES } from "../../src/mocks/handlers/heroHandler";
import { VILLAINS } from "../../src/mocks/handlers/villainHandler";
import { AntiHeroModel } from "../../src/features/antiHeroes/antiHeroTypes";
import { Simulate } from "react-dom/test-utils";
import animationEnd = Simulate.animationEnd;

Cypress.Commands.add("getAntiHeroesCommand", () => {
  cy.intercept("GET", "/anti-heroes", {
    statusCode: 200,
    body: ANTI_HEROES,
  });
});

Cypress.Commands.add("deleteAntiHeroCommand", () => {
  cy.intercept("DELETE", "/anti-heroes/*", {
    statusCode: 200,
  });
});

Cypress.Commands.add("postAntiHeroCommand", (antiHero: AntiHeroModel) => {
  antiHero.id = "1a2s3d";

  cy.intercept("POST", "/anti-heroes", {
    statusCode: 201,
    body: antiHero,
  });
});

Cypress.Commands.add("fetchHeroes", () => {
  cy.intercept("GET", "/heroes", {
    statusCode: 200,
    body: HEROES,
  });
});

Cypress.Commands.add("fetchVillains", () => {
  cy.intercept("GET", "/villains", {
    statusCode: 200,
    body: VILLAINS,
  });
});
