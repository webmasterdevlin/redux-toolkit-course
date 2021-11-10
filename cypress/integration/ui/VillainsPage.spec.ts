/// <reference types="cypress"/>

import { villainsFixture } from "../../../src/mocks/handlers/villainHandler";

const url = "/api/villains";

describe("Villains Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand(url, villainsFixture);
    cy.deleteCommand(`${url}/*`);
    cy.NavigateByTestIdCommand("nav-villains");
    cy.SetupInputFieldsCommand();
  });

  it("should render villains", () => {
    cy.get("[data-testid=card]").should("have.length", villainsFixture.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked a villain after clicking a mark button", () => {
      const index = 1;
      cy.findAllByTestId("mark-button").eq(index).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove a villain from the store after clicking a remove button", () => {
      const index = 1;
      cy.get("[data-testid=remove-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        villainsFixture.length - 1
      );
    });

    it("should delete a villain from the database after clicking a delete-from-db button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        villainsFixture.length - 1
      );
    });
  });

  context("Save Button", () => {
    it("should add a new villain", () => {
      const firstName = "Victor";
      const lastName = "Von Doom";
      const house = "Marvel";
      const knownAs = "Doctor Doom";

      cy.get("@FirstName").type(firstName);
      cy.get("@LastName").type(lastName);
      cy.get("@House").type(house);
      cy.get("@KnownAs").type(knownAs);

      cy.postCommand(url, {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@Save").click();

      cy.findAllByTestId("card").should(
        "have.length",
        villainsFixture.length + 1
      );
      cy.findByTestId("total-villains").contains(villainsFixture.length + 1);
    });
  });

  context("Refetch", () => {
    it("should refetch all villains after soft deleting all villains", () => {
      cy.get("[data-testid=remove-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should(
        "have.length",
        villainsFixture.length
      );
      cy.get("[data-testid=total-villains]").contains(villainsFixture.length);
    });

    it("should refetch all villains after deleting all villains", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should(
        "have.length",
        villainsFixture.length
      );
      cy.get("[data-testid=total-villains]").contains(villainsFixture.length);
    });
  });
});
