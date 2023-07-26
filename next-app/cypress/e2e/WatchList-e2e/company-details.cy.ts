/* eslint-disable jest/expect-expect */
/// <reference types="cypress"/>

describe("AMP Company Details Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.contains('Saved Companies').click();
    });
  
    it("Should successfully add AMP to the list", () => {
        cy.get('#input-with-icon-textfield')
            .click()
            .clear()
            .type('AMP')
            .type('{enter}');

        cy.contains('AMP LIMITED')
            .should("be.visible");
    });

    it("Should successfully view the AMP details", () => {
        cy.get('#-view-AMP-')
            .click();

        cy.contains('AMP LIMITED')
            .should("be.visible");

        cy.contains('Return to Companies')
            .should("be.visible")
            .click();
    });

    it("Should successfully delete AMP from the company list", () => {
        cy.get('#-delete-AMP-')
            .click();

        cy.contains('AMP LIMITED')
            .should("not.exist");
    });
});

