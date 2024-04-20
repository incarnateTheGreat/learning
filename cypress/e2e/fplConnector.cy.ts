describe('FPLConnector', () => {
  it('logs into site, navigates around Scores page, visits Manky Street player, navigates through players, and logs out', () => {
    // cy.visit('http://localhost:3000')

    cy.get('[data-testid=login_email]').type('incarnate@rogers.com')
    cy.get('[data-testid=login_password]').type('korn2222')

    cy.get('form').submit();

    cy.contains("a", "FPLConnector", {matchCase: true}).should("exist")

    cy.contains("a", "Scores", {matchCase: true}).click()

    cy.wait(1000)

    cy.get('[data-testid=gameweek_selector]').click()
    cy.wait(1000)

    cy.focused().type("{upArrow}")
    cy.focused().type("{upArrow}")
    cy.focused().type("{upArrow}")
    cy.focused().type("{upArrow}")
    cy.focused().type("{upArrow}")
    cy.focused().type("{enter}")

    cy.get('[data-testid=gameweek_selector]').click()
    cy.wait(1000)

    cy.get('[data-testid=gameweek_10]').click()

    cy.contains("a", "FPLConnector", {matchCase: true}).click()

    cy.contains("a", "Manky Street").click()

    cy.contains("h1", "Manky Street").should("exist")

    cy.contains("button", "Son").click()

    cy.contains("span", "Son", {matchCase: true}).should("exist")
    cy.contains("span", "Heung-min", {matchCase: true}).should("exist")

    cy.wait(3000);

    cy.get('body').type('{esc}')

    cy.scrollTo('top')

    cy.contains("button", "Gabriel").click()

    cy.contains("span", "Gabriel", {matchCase: true}).should("exist")

    cy.wait(2000);
    
    cy.get('body').type('{esc}')

    cy.scrollTo('top')

    cy.contains("a", "Analyze", {matchCase: true}).should("exist")
    cy.contains("a", "Analyze", {matchCase: true}).click()

    cy.contains("a", "2611380").click()

    cy.get('input').type('Haaland')

    cy.wait(1000)

    cy.focused().type("{downArrow}")
    // cy.focused().type("{enter}")
    cy.contains("button", "Haaland").click()

    cy.wait(2000)

    cy.get('body').type('{esc}')

    cy.contains("button", "Log out", {matchCase: true}).click()
  })
})