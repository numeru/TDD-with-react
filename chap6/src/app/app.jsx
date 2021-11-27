import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import './app.css';
import Habits from '../components/habits/habits';
import Navbar from '../components/navbar/navbar';

const App = ({ habitPresenter }) => {
  const [habits, setHabits] = useState(habitPresenter.getHabits());

  const handleIncrement = useCallback((habit) => {
    habitPresenter.incrementHabits(habit, setHabits);
  }, []);

  const handleDecrement = useCallback((habit) => {
    habitPresenter.decrementHabits(habit, setHabits);
  }, []);

  const handleDelete = useCallback((habit) => {
    habitPresenter.deleteHabit(habit, setHabits);
  }, []);

  const handleAdd = useCallback((name) => {
    setHabits((habits) => [...habits, { id: Date.now(), name, count: 0 }]);
  }, []);

  const handleReset = useCallback(() => {
    habitPresenter.resetHabits(setHabits);
  }, []);

  return (
    <>
      <Navbar totalCount={habits.filter((item) => item.count > 0).length} />
      <Habits
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </>
  );
};

export default App;
