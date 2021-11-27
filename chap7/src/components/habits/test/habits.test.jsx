import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Habits from '../habits';

describe('Habits', () => {
  let habits;
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset = jest.fn();

    habits = [
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 0 },
    ];

    render(
      <Habits
        habits={habits}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    );
  });
  it('show all habits passed by props', () => {
    const habitLists = screen.getAllByRole('listitem');
    expect(habitLists).toHaveLength(3);
  });

  it('call onReset when reset button clicked', () => {
    const button = screen.getByRole('button', {
      name: 'Reset All',
    });

    userEvent.click(button);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('call onAdd when add button clicked', () => {
    const input = screen.getByPlaceholderText('Habit');
    const button = screen.getByRole('button', {
      name: 'Add',
    });

    userEvent.type(input, 'Singing');
    userEvent.click(button);

    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('call onDelete when delete button clicked', () => {
    const button = screen.getAllByTitle('delete')[0];

    userEvent.click(button);

    expect(onDelete).toHaveBeenCalledWith(habits[0]);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
