/// <reference types="cypress" />

// Describe test suite
describe("Submit sessions", () => {

    beforeEach(() => {
        cy.clickViewSessions()
        cy.url().should('include', '/sessions')

        cy.get('a').contains('Submit a Session!').click()
    })
    // Run before each test within this describe block
    it('should navigate to submit sessions page', () => {
        cy.url().should('include', '/sessions/new')
    })

    it('should submit a session to the conference', () => {
        // Filling the form with new session informatio
        cy.contains('Title').type('New session title')
        cy.contains('Description').type('This is the greatest session')
        cy.contains('Day').type('Thursday')
        cy.contains('Level').type('Advanced')

        // Submit the form
        cy.get('form').submit()

        // Validate that form was submitted successfully
        cy.contains('Session Submitted Successfully')
    })
})