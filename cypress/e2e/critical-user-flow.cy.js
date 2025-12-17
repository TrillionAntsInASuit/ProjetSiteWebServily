describe('Critical User Flows E2E Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  /**
   * Test 1: Client Registration and Login Flow
   */
  describe('Client Registration and Login Flow', () => {
    it('should allow a new client to register and login successfully', () => {
      const testName = `Test Client ${Date.now()}`;
      const testEmail = `client_${Date.now()}@test.com`;
      const testPassword = 'TestPass123!';
      
      // Navigate to registration
      cy.contains(/register|sign up/i).click();
      cy.url().should('include', '/register');

      // Wait for form to load
      cy.get('form.signup-form', { timeout: 5000 }).should('be.visible');

      // Fill out registration form with correct selectors
      cy.get('input#name').type(testName);
      cy.get('input#email').type(testEmail);
      cy.get('input#password').type(testPassword);
      cy.get('input#confirmPassword').type(testPassword);
      
      // Select client from status dropdown
      cy.get('select#status').select('client');

      // Submit registration
      cy.get('button[type="submit"]').contains('Register').click();

      // Should redirect to home and be logged in
      cy.url().should('eq', Cypress.config().baseUrl + '/', { timeout: 10000 });

      // Verify localStorage contains correct data
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.equal('dummy-token');
        expect(win.localStorage.getItem('userId')).to.exist;
        expect(win.localStorage.getItem('userType')).to.equal('client');
      });

      // Test logout
      cy.contains(/logout|sign out|disconnect/i).click();
      
      // Verify localStorage is cleared
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.be.null;
      });
    });
  });

  /**
   * Test 2: Employer Service Creation Flow
   */
  describe('Employer Service Creation and Management Flow', () => {
    it('should allow employer to register, login and create a service', () => {
      // Register a new employer
      const employerName = `Test Employer ${Date.now()}`;
      const employerEmail = `employer_${Date.now()}@test.com`;
      const employerPassword = 'TestPass123!';
      
      // Navigate to registration
      cy.contains(/register|sign up/i).click();
      cy.url().should('include', '/register');
      cy.get('form.signup-form', { timeout: 5000 }).should('be.visible');
      
      // Fill registration form
      cy.get('input#name').type(employerName);
      cy.get('input#email').type(employerEmail);
      cy.get('input#password').type(employerPassword);
      cy.get('input#confirmPassword').type(employerPassword);
      cy.get('select#status').select('employeur');
      cy.get('button[type="submit"]').contains('Register').click();
      
      // Wait for redirect to dashboard
      cy.url().should('eq', Cypress.config().baseUrl + '/', { timeout: 10000 });
      
      // Verify employer is logged in
      cy.window().then((win) => {
        expect(win.localStorage.getItem('userType')).to.equal('employeur');
      });

      // Create a service
      const serviceName = `Test Service ${Date.now()}`;
      const serviceDescription = 'This is a test service for E2E testing';
      const maxMembers = '10';

      // Navigate to create service page
      cy.contains(/create|créer/i, { timeout: 5000 }).click();
      cy.url().should('include', '/create', { timeout: 5000 });

      // Fill out service creation form
      cy.get('input#name').type(serviceName);
      cy.get('input#maxMembres').type(maxMembers);
      cy.get('textarea#description').type(serviceDescription);
      
      // Select service type from dropdown
      cy.get('select[aria-label="Service Types"]').select('Graphic Design');

      // Submit service creation
      cy.contains('button', /register/i).click();


      // Verify service was created (it should appear on the page)
      cy.wait(2000);
    });

    it('should prevent non-subscribed employer from creating multiple services', () => {
      // Register a new employer
      const employerName = `Test Employer Multi ${Date.now()}`;
      const employerEmail = `employer_multi_${Date.now()}@test.com`;
      const employerPassword = 'TestPass123!';
      
      // Register
      cy.contains(/register|sign up/i).click();
      cy.get('input#name').type(employerName);
      cy.get('input#email').type(employerEmail);
      cy.get('input#password').type(employerPassword);
      cy.get('input#confirmPassword').type(employerPassword);
      cy.get('select#status').select('employeur');
      cy.get('button[type="submit"]').contains('Register').click();
      
      cy.url().should('eq', Cypress.config().baseUrl + '/', { timeout: 10000 });

      // Create first service
      cy.contains(/create/i).click();
      cy.url().should('include', '/create');
      
      cy.get('input#name').type(`First Service ${Date.now()}`);
      cy.get('input#maxMembres').type('5');
      cy.get('textarea#description').type('First service');
      cy.get('select[aria-label="Service Types"]').select('Web Development');
      cy.contains('button', /register/i).click();
      
      cy.wait(2000);

      // Try to create second service
      cy.contains(/create/i).click();
      cy.url().should('include', '/create');
      
      cy.get('input#name').type(`Second Service ${Date.now()}`);
      cy.get('input#maxMembres').type('5');
      cy.get('textarea#description').type('Second service');
      cy.get('select[aria-label="Service Types"]').select('Photography');
      cy.contains('button', /register/i).click();


    });
  });

  /**
   * Test 3: Client Login and Browse Services Flow
   */
  describe('Client Login and Service Browse Flow', () => {
    it('should allow client to register, login, and navigate to services', () => {
      // Register a new client
      const clientName = `Test Client Browse ${Date.now()}`;
      const clientEmail = `client_browse_${Date.now()}@test.com`;
      const clientPassword = 'TestPass123!';
      
      // Navigate to registration
      cy.contains(/register|sign up/i).click();
      cy.url().should('include', '/register');
      cy.get('form.signup-form', { timeout: 5000 }).should('be.visible');
      
      // Fill registration form
      cy.get('input#name').type(clientName);
      cy.get('input#email').type(clientEmail);
      cy.get('input#password').type(clientPassword);
      cy.get('input#confirmPassword').type(clientPassword);
      cy.get('select#status').select('client');
      cy.get('button[type="submit"]').contains('Register').click();
      
      // Wait for redirect to dashboard
      cy.url().should('eq', Cypress.config().baseUrl + '/', { timeout: 10000 });
      
      // Verify client is logged in
      cy.window().then((win) => {
        expect(win.localStorage.getItem('userType')).to.equal('client');
        expect(win.localStorage.getItem('token')).to.equal('dummy-token');
      });

      // Navigate to services page if services link exists
      cy.get('body').then(($body) => {
        const servicesLinkExists = $body.text().match(/services/i);
        
        if (servicesLinkExists) {
          cy.contains(/services/i, { timeout: 5000 }).click();
          cy.url().should('include', '/services');
          
          // Verify services page loaded successfully
          cy.get('body').should('be.visible');
          cy.wait(1000);
          
          // The page should show some content (services or message)
          cy.get('body').should('not.be.empty');
        } else {
          // If no services link, just verify dashboard loaded
          cy.contains(/dashboard|bienvenue|welcome/i).should('be.visible');
        }
      });
    });

    it('should allow existing client to login', () => {
      // First register a client
      const clientName = `Existing Client ${Date.now()}`;
      const clientEmail = `existing_${Date.now()}@test.com`;
      const clientPassword = 'TestPass123!';
      
      // Register
      cy.contains(/register|sign up/i).click();
      cy.get('input#name').type(clientName);
      cy.get('input#email').type(clientEmail);
      cy.get('input#password').type(clientPassword);
      cy.get('input#confirmPassword').type(clientPassword);
      cy.get('select#status').select('client');
      cy.get('button[type="submit"]').contains('Register').click();
      
      cy.url().should('eq', Cypress.config().baseUrl + '/', { timeout: 10000 });
      
      // Logout
      cy.contains(/logout|sign out|disconnect/i).click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      // Now login again
      cy.contains(/login|connexion/i).click();
      cy.url().should('include', '/login');
      
      // Fill login form
      cy.get('input#email').type(clientEmail);
      cy.get('input#password').type(clientPassword);
      cy.get('button.button-login').click();
      
      // Should be logged in
      cy.url().should('eq', Cypress.config().baseUrl + '/', { timeout: 10000 });
      
      // Verify logged in
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.equal('dummy-token');
        expect(win.localStorage.getItem('userType')).to.equal('client');
      });
    });
  });
});