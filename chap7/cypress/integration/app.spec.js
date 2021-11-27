/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
describe('Habit Tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('render', () => {
    cy.findByText('Habit Tracker').should('exist');
  });

  it('add new habit at the end', () => {
    const input = cy.findByPlaceholderText('Habit');
    input.type('Singing');

    const button = cy.findByText('Add');
    button.click();

    cy.findAllByTestId('habit-name').last().should('have.text', 'Singing');
    cy.findAllByTestId('habit-count').last().should('have.text', '0');
  });

  it('increase count', () => {
    const incrementButton = cy.findAllByTitle('increment').first();

    incrementButton.click();

    cy.findAllByTestId('habit-count').first().should('have.text', '1');
  });

  it('decrease count', () => {
    const incrementButton = cy.findAllByTitle('increment').first();

    incrementButton.click();

    const decrementButton = cy.findAllByTitle('decrement').first();

    decrementButton.click();

    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('do not decrease below 0', () => {
    const decrementButton = cy.findAllByTitle('decrement').first();

    decrementButton.click();

    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('show active count on the header', () => {
    const incrementButton = cy.findAllByTitle('increment').first();

    incrementButton.click();

    cy.findByTestId('total-count').should('have.text', '1');
  });

  it('reset to 0', () => {
    const firstButton = cy.findAllByTitle('increment').first();

    firstButton.click();

    const lastButton = cy.findAllByTitle('increment').last();

    lastButton.click();

    const resetButton = cy.findByRole('button', {
      name: 'Reset All',
    });

    resetButton.click();

    cy.findAllByTestId('habit-count').each((item) => {
      cy.wrap(item).should('have.text', '0');
    });
  });

  it('delete habit', () => {
    const button = cy.findAllByTitle('delete').first();
    button.click();

    const firstHabit = cy.findAllByTestId('habit-name').first();

    firstHabit.should('have.text', 'Running');
  });
});
