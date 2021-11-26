# Unit Test

- 리액트 컴포넌트에 의존하지 않고 순수 비지니스 로직을 테스트한다.

## 1. 리펙토링

- 유닛 테스트를 위해 로직을 클래스로 따로 추출한다.

```js
class HabitPresenter {
  constructor(habits) {
    this.habits = habits;
  }

  getHabits() {
    return this.habits;
  }

  incrementHabits(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });

    update(this.habits);
  }
  //...
}

export default HabitPresenter;
```

```js
const habitPresenter = new HabitPresenter([
  { id: 1, name: 'Reading', count: 0 },
  { id: 2, name: 'Running', count: 0 },
  { id: 3, name: 'Coding', count: 0 },
]);
```

```js
const [habits, setHabits] = useState(habitPresenter.getHabits());

const handleIncrement = useCallback((habit) => {
  habitPresenter.incrementHabits(habit, setHabits);
}, []);
```

---

## 테스트

```js
describe('HabitPresenter', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 0 },
    { id: 2, name: 'Running', count: 0 },
    { id: 3, name: 'Coding', count: 1 },
  ];

  let habitPresenter;

  const update = jest.fn();

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(habitPresenter.getHabits());
  }

  beforeEach(() => {
    habitPresenter = new HabitPresenter(habits, 4);
    update.mockClear();
  });

  it('decrement count of habit', () => {
    const selectedHabit = habits[2];

    habitPresenter.decrementHabits(selectedHabit, update);

    expect(habitPresenter.getHabits()[2].count).toBe(0);

    checkUpdateIsCalled();
  });

  it('do not set the count value below 0', () => {
    const selectedHabit = habits[2];

    habitPresenter.decrementHabits(selectedHabit, update);
    habitPresenter.decrementHabits(selectedHabit, update);

    expect(habitPresenter.getHabits()[2].count).toBe(0);
  });

  it('add new habit', () => {
    const newHabitName = 'Singing';
    habitPresenter.addHabit(newHabitName, update);

    expect(habitPresenter.getHabits()).toHaveLength(4);

    expect(habitPresenter.getHabits()[3].name).toBe('Singing');
    expect(habitPresenter.getHabits()[3].count).toBe(0);

    checkUpdateIsCalled();
  });

  it('do not create new object when count is 0', () => {
    const prevHabit = habitPresenter.getHabits();
    habitPresenter.resetHabits(update);
    const updatedHabit = habitPresenter.getHabits();

    expect(updatedHabit[0]).toBe(prevHabit[0]);
  });

  //...
});
```
