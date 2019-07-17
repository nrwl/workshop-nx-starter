import { getGreeting } from '../support/app.po';

describe('logs', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to logs!');
  });
});
