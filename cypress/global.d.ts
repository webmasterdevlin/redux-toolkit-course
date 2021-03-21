/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    getAntiHeroesCommand(): Chainable<any>;
    fetchHeroes(): Chainable<any>;
    fetchVillains(): Chainable<any>;

    deleteAntiHeroCommand(): Chainable<any>;
    postAntiHeroCommand(antiHero: any): Chainable<any>;
  }
}
