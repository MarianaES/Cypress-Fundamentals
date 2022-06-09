describe("Session page", () => {
    beforeEach(() => {
        cy.clickViewSessions()

        cy.url().should('include', '/sessions')

        // Define aliases
        cy.dataCy('AllSessions').as('AllSessionBtn')
        cy.dataCy('Wednesday').as('WednesdayBtn')
        cy.dataCy('Thursday').as('ThursdayBtn')
        cy.dataCy('Friday').as('FridayBtn')

        cy.intercept('POST', 'http://localhost:4000/graphql').as('getSessionInfo')
    })
    it('should navigate to conference sessions page and view day filter options', () => {
        // Validate that buttons to filter by day exists
        cy.get('@AllSessionBtn')
        cy.get('@WednesdayBtn')
        cy.get('@ThursdayBtn')
        cy.get('@FridayBtn')
    })
    
    it('should filter session and only display Wednesday sessions if Wednesday button clicked', () => {
        cy.get('@WednesdayBtn').click()

        // Assertions
        cy.dataCy('day')
        cy.dataCy('day').should('have.length', 21)
        cy.dataCy('day').contains('Wednesday').should('be.visible')
        cy.dataCy('day').contains('Thursday').should('not.exist')
        cy.dataCy('day').contains('Friday').should('not.exist')
    })

    it('should filter session and only display Thursday sessions if Thursday button clicked', () => {
        cy.get('@ThursdayBtn').click()
        cy.wait('@getSessionInfo')

        // Assertions
        // cy.dataCy('day').should('have.length', 111)
        cy.dataCy('day').contains('Wednesday').should('not.exist')
        cy.dataCy('day').contains('Thursday').should('be.visible')
        cy.dataCy('day').contains('Friday').should('not.exist')
    })

    it('should filter session and only display Friday sessions if Friday button clicked', () => {
        // Stubbing a response data
        cy.intercept('POST', 'http://localhost:4000/graphql', { fixture: 'fridaySessionData.json'}).as('getFridaySessionData')
        cy.get('@FridayBtn').click()
        cy.wait('@getFridaySessionData')

        // Assertions
        cy.dataCy('day').should('have.length', 4)
        cy.dataCy('day').contains('Wednesday').should('not.exist')
        cy.dataCy('day').contains('Thursday').should('not.exist')
        cy.dataCy('day').contains('Friday').should('be.visible')
    })

    it('should filter session and display All sessions if AllSessions button clicked', () => {
        cy.get('@AllSessionBtn').click()
        cy.wait('@getSessionInfo')

        cy.dataCy('day').contains('Wednesday').should('be.visible')
        cy.dataCy('day').contains('Thursday').should('be.visible')
        cy.dataCy('day').contains('Friday').should('be.visible')
    })
})