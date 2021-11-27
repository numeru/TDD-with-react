import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import HabitPresenter from '../../utils/habit_presenter';
import App from '../app';

describe('App', () => {
  let habitPresenter;

  beforeEach(() => {
    habitPresenter = new HabitPresenter([
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 0 },
    ]);
  });

  it('snapshot', () => {
    const component = renderer.create(<App habitPresenter={habitPresenter} />);
    expect(component.toJSON).toMatchSnapshot();
  });

  it('increase count', () => {
    render(<App habitPresenter={habitPresenter} />);

    const button = screen.getAllByTitle('increment')[0];
    userEvent.click(button);
    const count = screen.getAllByTestId('habit-count')[0];
    expect(count).toHaveTextContent(1);
  });

  //...
});
