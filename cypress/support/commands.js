/// <reference types="Cypress"/>

import "@cypress/code-coverage/support";
import "@percy/cypress";
import "@bahmutov/cy-api/support";
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("fetchAntiHeroes", (options = {}) => {
  console.log("HEELLLO");

  cy.intercept("GET", "http://localhost:5000/anti-heroes/", {
    body: {
      statusCode: 200,
      message: "Request successful",
      result: [],
    },
  }).as("loadData");
});
