# Integration Test

- 각각의 기능 동작은 유닛 테스트에서 검사하였기 때문에, prop으로 받은 것들이 제대로 보여지고 동작하는지 검사한다.
- 하위 컴포넌트에서 테스트한 기능도 상위 컴포넌트에서 다시 테스트한다.

## 1. 스냅샷 테스트

- 기존의 상태를 저장한다.
- 예상하는 목록이나 텍스트 등이 잘 나오는지는 스냅샷 만으로 확인 가능한다.

```js
import renderer from 'react-test-renderer';

it('snapshot', () => {
  const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});

// yarn test -- -u (스냅샷 업데이트)
```

## 2. 컴포넌트 테스트

```js
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
```
