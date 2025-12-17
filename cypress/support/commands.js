// Custom commands for reusable actions

Cypress.Commands.add('loginAsClient', (email = 'client@test.com', password = 'TestPass123!') => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.window().then((win) => {
    expect(win.localStorage.getItem('userType')).to.equal('client');
  });
});

Cypress.Commands.add('loginAsEmployer', (email = 'employer@test.com', password = 'TestPass123!') => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.window().then((win) => {
    expect(win.localStorage.getItem('userType')).to.equal('employeur');
  });
});

Cypress.Commands.add('createService', (serviceName, description, maxMembers, serviceType) => {
  cy.visit('/create');
  cy.get('input[name="name"]').type(serviceName);
  cy.get('input[name="maxMembres"]').type(maxMembers);
  cy.get('textarea[name="description"]').type(description);
  cy.get('select').contains(/Service Types|Type of service/i).parent().select(serviceType);
  cy.contains('button', /register|create|submit/i).click();
});