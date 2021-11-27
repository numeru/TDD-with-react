# E2E Test

## Cypress

1. 세팅

```js
yarn add cypress -D
yarn add @testing-library/cypress -D

// pakage.json
"cypress" : "cypress open,

// cypress.json
{
  "baseUrl": "http://localhost:3000"
}
```

2. 테스트 작성

```js
// /cypress/integration
// app.spec.js

/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
describe('Habit Tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('render', () => {
    cy.findByText('Habit Tracker').should('exist');
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
```
