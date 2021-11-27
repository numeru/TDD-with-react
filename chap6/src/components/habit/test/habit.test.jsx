import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Habit from '../habit';
describe('Habit', () => {
  const habit = { id: 1, name: 'Reading', count: 77 };
  let onIncrement;
  let onDecrement;
  let onDelete;
  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();

    render(
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
  });

  it('snapshot', () => {
    const component = renderer.create(
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('show name and count of habit', () => {
    const name = screen.getByText('Reading');
    expect(name).toBeInTheDocument();

    const count = screen.getByText('77');
    expect(count).toBeInTheDocument();
  });

  it('call onIncrement when increment button clicked', () => {
    const button = screen.getByTitle('increment');
    userEvent.click(button);

    expect(onIncrement).toHaveBeenCalledWith(habit);
  });

  it('call onDecrement when decrement button clicked', () => {
    const button = screen.getByTitle('decrement');
    userEvent.click(button);

    expect(onDecrement).toHaveBeenCalledWith(habit);
  });

  it('call onDelete when delete button clicked', () => {
    const button = screen.getByTitle('delete');
    userEvent.click(button);

    expect(onDelete).toHaveBeenCalledWith(habit);
  });
});
