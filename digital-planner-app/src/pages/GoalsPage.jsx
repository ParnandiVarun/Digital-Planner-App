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
import CardContainer from "../components/CardContainer";
import EntryCard from "../components/EntryCard";
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
    <CardContainer title="🎯 Goal Tracker">
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
        {goals.length === 0 ? (
          <p>No goals added yet.</p>
        ) : (
          goals.map((goal) => {
            const progress = calculateProgress(goal);
            const progressColor =
              progress < 50 ? "#f6ad55" : progress < 80 ? "#ecc94b" : "#48bb78";
            return (
              <EntryCard
                key={goal.id}
                title={goal.title}
                description={goal.description}
                date={`Target: ${goal.targetDate}`}
                onDelete={() => handleDelete(goal.id)}
              >
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: progressColor,
                    }}
                  ></div>
                </div>
                <p style={{ fontSize: "14px", textAlign: "center" }}>
                  {Math.round(progress)}% complete
                </p>
              </EntryCard>
            );
          })
        )}
      </div>
    </CardContainer>
  );
};

export default GoalsPage;
