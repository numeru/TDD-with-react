import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitAddForm from '../habitAddForm';
import renderer from 'react-test-renderer';
describe('habitAddForm', () => {
  it('snapshot', () => {
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('form submit', () => {
    let onAdd;
    let button;
    let input;
    beforeEach(() => {
      onAdd = jest.fn();

      render(<HabitAddForm onAdd={onAdd} />);

      input = screen.getByPlaceholderText('Habit');
      button = screen.getByText('Add');
    });
    it('call onAdd whtn button is clicked', () => {
      userEvent.type(input, 'Singing');
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledWith('Singing');
    });

    it('do not call onAdd when the input is empty', () => {
      userEvent.type(input, '');
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});
