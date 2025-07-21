import React, { useState, useEffect } from "react";
import { db } from "../api/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/goals.css";

const GoalsPage = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    if (!user) return;
    const goalsRef = collection(db, "users", user.uid, "goals");
    const snapshot = await getDocs(goalsRef);
    const goalsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGoals(goalsList);
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!title || !targetDate) return;

    try {
      await addDoc(collection(db, "users", user.uid, "goals"), {
        title,
        description,
        targetDate,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setTargetDate("");
      fetchGoals();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "goals", id));
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const calculateProgress = (goal) => {
    const createdAt = goal.createdAt?.toDate
      ? goal.createdAt.toDate()
      : new Date();
    const target = new Date(goal.targetDate);
    const now = new Date();

    const total = target - createdAt;
    const elapsed = now - createdAt;
    const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
    return isNaN(progress) ? 0 : progress;
  };

  return (
    <div className="goals-container">
      <h2>🎯 Goal Tracker</h2>
      <form onSubmit={handleAddGoal} className="goal-form">
        <input
          type="text"
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      <div className="goal-list">
        {goals.map((goal) => {
          const progress = calculateProgress(goal);
          return (
            <div key={goal.id} className="goal-card">
              <h3>{goal.title}</h3>
              {goal.description && <p>{goal.description}</p>}
              <p>Target Date: {goal.targetDate}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                    background:
                      progress < 50
                        ? "#f6ad55"
                        : progress < 80
                        ? "#ecc94b"
                        : "#48bb78",
                  }}
                ></div>
              </div>
              <p>{Math.round(progress)}% complete</p>
              <button
                onClick={() => handleDelete(goal.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsPage;
