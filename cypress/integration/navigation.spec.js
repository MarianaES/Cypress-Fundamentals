/// <reference types="cypress" />

// Describe test suite
describe("Navigation", () => {
    it('should navigate to conference sessions page', () => {
        cy.clickViewSessions()

        cy.url().should('include', '/sessions')
    })
})