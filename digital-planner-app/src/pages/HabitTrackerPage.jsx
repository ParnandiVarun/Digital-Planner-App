// /src/pages/HabitTrackerPage.jsx

import React, { useState, useEffect } from "react";
import { db } from "../api/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/habitTracker.css";

const HabitTrackerPage = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    if (!user) return;
    const habitsRef = collection(db, "users", user.uid, "habits");
    const snapshot = await getDocs(habitsRef);
    const habitsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setHabits(habitsList);
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await addDoc(collection(db, "users", user.uid, "habits"), {
        title,
        description,
        createdAt: serverTimestamp(),
        completedDates: [],
      });
      setTitle("");
      setDescription("");
      fetchHabits();
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  const toggleCompletion = async (habit) => {
    const today = new Date().toISOString().split("T")[0];
    const habitRef = doc(db, "users", user.uid, "habits", habit.id);
    let updatedDates = habit.completedDates || [];

    if (updatedDates.includes(today)) {
      updatedDates = updatedDates.filter((date) => date !== today);
    } else {
      updatedDates.push(today);
    }

    try {
      await updateDoc(habitRef, { completedDates: updatedDates });
      fetchHabits();
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const calculateStreak = (completedDates) => {
    const sortedDates = (completedDates || []).sort().reverse();
    let streak = 0;
    let currentDate = new Date();

    for (let date of sortedDates) {
      if (date === currentDate.toISOString().split("T")[0]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <div className="habit-container">
      <h2>🌿 Habit Tracker</h2>
      <form onSubmit={handleAddHabit} className="habit-form">
        <input
          type="text"
          placeholder="Habit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Habit</button>
      </form>

      <div className="habit-list">
        {habits.map((habit) => {
          const today = new Date().toISOString().split("T")[0];
          const completedToday = habit.completedDates?.includes(today);
          const streak = calculateStreak(habit.completedDates);

          return (
            <div
              key={habit.id}
              className={`habit-card ${completedToday ? "completed" : ""}`}
            >
              <h3>{habit.title}</h3>
              {habit.description && <p>{habit.description}</p>}
              <p>Streak: {streak} day(s)</p>
              <button
                onClick={() => toggleCompletion(habit)}
                className={completedToday ? "unmark-btn" : "mark-btn"}
              >
                {completedToday ? "Unmark Today" : "Mark as Done Today"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitTrackerPage;
