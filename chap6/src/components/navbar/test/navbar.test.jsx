import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Navbar from '../navbar';

describe('Navbar', () => {
  let totalCount;

  beforeEach(() => {
    totalCount = 3;
  });

  it('snapshot', () => {
    const component = renderer.create(<Navbar totalCount={totalCount} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('show total count passed by props', () => {
    render(<Navbar totalCount={totalCount} />);
    const navCount = screen.getByText('3');
    expect(navCount).toBeInTheDocument();
  });
});
