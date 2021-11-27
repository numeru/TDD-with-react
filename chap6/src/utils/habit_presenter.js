class HabitPresenter {
  constructor(habits, maxHabits) {
    this.habits = habits;
    this.maxHabits = maxHabits;
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

  decrementHabits(habit, update) {
    this.habits = this.habits.map((item) => {
      if (item.id === habit.id) {
        const count = item.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });

    update(this.habits);
  }

  deleteHabit(habit, update) {
    this.habits = this.habits.filter((item) => item.id !== habit.id);

    update(this.habits);
  }

  addHabit(name, update) {
    if (this.habits.length === this.maxHabits) {
      throw new Error(`최대 습관의 갯수는 ${this.maxHabits}개 입니다.`);
    }

    const newHabit = { id: Date.now(), name, count: 0 };
    this.habits = [...this.habits, newHabit];
    update(this.habits);
  }

  resetHabits(update) {
    this.habits = this.habits.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
    });

    update(this.habits);
  }
}

export default HabitPresenter;
