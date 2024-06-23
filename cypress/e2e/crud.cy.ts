describe('Crud Operations', () => {
  let accessToken;

  before(() => {
    // Visit the login page
    cy.visit('http://localhost:3000/login');

    // Fill in the login form
    cy.get('#username').type('newboy');
    cy.get('#password').type('123123');

    // Intercept the login request and store the access token from the response headers
    cy.intercept('POST', 'https://localhost:44365/api/auth/login').as('loginRequest');
    cy.get('.gap-2 > .inline-flex').click();

    // Wait for the login request to complete and retrieve the access token from the response headers
    cy.wait('@loginRequest').then((interception) => {
      accessToken = interception.response.headers['x-access-token'];
    });
  });

  it('should successfully log in and navigate to the quest page', () => {
    // Verify the login was successful
    cy.url().should('include', '/quest');
    cy.get(':nth-child(1) > .relative > .justify-center').should('contain', 'Quest Info');

    //create objective
    cy.get('#root > :nth-child(2) > .inline-flex').click()
    cy.get('#ObjectiveName').type('test')
    cy.get('#currentAmount').type('10')
    cy.wait(1500);
    cy.get("#radix-\\:rl\\: > div.flex.flex-col-reverse.sm\\:flex-row.sm\\:justify-end.sm\\:space-x-2 > button").click();
    cy.wait(1500);

    //edit new objective
    cy.get('#target-element > li > div > div:nth-child(1)').click()
    cy.wait(1500);
    cy.get('#currentAmount').clear()
    cy.get('#currentAmount').type('99')
    cy.get('#submit-changes').click()
    cy.wait(1500);

    //delete new objective
    cy.get('#target-element > li > div > div:nth-child(1)').click()
    cy.wait(1500);
    cy.get('#trash').click()
    cy.wait(1500);
    cy.get('#delete-objective').click()





  });

});