/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    getCommand(url: string, responseBody: Array<any>): void;
    deleteCommand(url: string): void;
    postCommand(url: string, requestBody: any): void;
    SetupInputFieldsCommand(): void;
    NavigateByTestIdCommand(testId: string): void;
  }
}
