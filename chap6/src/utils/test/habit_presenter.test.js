import HabitPresenter from '../habit_presenter';

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

  it('init with habits', () => {
    expect(habitPresenter.getHabits()).toEqual(habits);
  });

  it('increment count of habit', () => {
    const selectedHabit = habits[1];
    habitPresenter.incrementHabits(selectedHabit, update);

    expect(habitPresenter.getHabits()[1].count).toBe(1);

    checkUpdateIsCalled();
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

  it('delete habit', () => {
    const selectedHabit = habits[0];
    habitPresenter.deleteHabit(selectedHabit, update);

    expect(habitPresenter.getHabits()).toHaveLength(2);

    expect(habitPresenter.getHabits()[0].name).toBe('Running');

    checkUpdateIsCalled();
  });

  it('add new habit', () => {
    const newHabitName = 'Singing';
    habitPresenter.addHabit(newHabitName, update);

    expect(habitPresenter.getHabits()).toHaveLength(4);

    expect(habitPresenter.getHabits()[3].name).toBe('Singing');
    expect(habitPresenter.getHabits()[3].count).toBe(0);

    checkUpdateIsCalled();
  });

  it('throw error when max habits limit is exceeded', () => {
    habitPresenter.addHabit('Singing', update);
    expect(() => {
      habitPresenter.addHabit('Eating', update);
    }).toThrow('최대 습관의 갯수는 4개 입니다.');
  });

  it('reset all counts to 0', () => {
    habitPresenter.resetHabits(update);

    expect(habitPresenter.getHabits()[0].count).toBe(0);
    expect(habitPresenter.getHabits()[1].count).toBe(0);
    expect(habitPresenter.getHabits()[2].count).toBe(0);

    checkUpdateIsCalled();
  });

  it('do not create new object when count is 0', () => {
    const prevHabit = habitPresenter.getHabits();
    habitPresenter.resetHabits(update);
    const updatedHabit = habitPresenter.getHabits();

    expect(updatedHabit[0]).toBe(prevHabit[0]);
  });
});
