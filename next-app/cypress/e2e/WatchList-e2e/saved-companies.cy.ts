/* eslint-disable jest/expect-expect */
/// <reference types="cypress"/>

describe("Saved Companies Page", () => {
    before(() => {
        cy.task("db:reset");
    });    

    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.contains('Saved Companies').click();
    });

    it("Should have an available ASX Code input control", () => {
        cy.get('#input-with-icon-textfield')
            .should("be.visible")
            .and("be.enabled");
    });

    
    it("Should have Computershare Limited the list", () => {
        cy.contains('COMPUTERSHARE LIMITED.')
            .should("be.visible");
    });

    it("Should successfully add the AAA to the list", () => {
        cy.get('#input-with-icon-textfield')
            .click()
            .clear()
            .type('AAA')
            .type('{enter}');

        cy.contains('BETASHARES AUSTRALIAN HIGH INTEREST CASH ETF')
            .should("be.visible");
    });

    it("Should successfully delete AAA from the company list", () => {
        cy.get('#-delete-AAA-')
            .click();

        cy.contains('BETASHARES AUSTRALIAN HIGH INTEREST CASH ETF')
            .should("not.exist");
    });
});

describe("Empty Company Details Page", () => {
    it("Should prompt to add a company", () => {
        cy.task("db:delete").visit("http://localhost:3000");   
        
        cy.contains('Saved Companies').click();
        cy.contains('Your Watch List is currently empty, please enter an ASX Symbol to add new companies.')
            .should("be.visible");           

        cy.task("db:reset");
    });
});      