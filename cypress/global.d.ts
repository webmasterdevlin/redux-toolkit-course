/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    fetchAntiHeroes(): Chainable<any>;
    fetchHeroes(): Chainable<any>;
    fetchVillains(): Chainable<any>;
  }
}
