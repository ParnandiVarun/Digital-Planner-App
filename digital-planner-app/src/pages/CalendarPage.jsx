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
import "../styles/calendarPage.css";

const CalendarPage = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const fetchEvents = async () => {
    if (!user) return;
    const eventsRef = collection(db, "users", user.uid, "calendarEvents");
    const snapshot = await getDocs(eventsRef);
    const eventsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(eventsList);
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!title || !date) return;
    try {
      await addDoc(collection(db, "users", user.uid, "calendarEvents"), {
        title,
        date,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDate("");
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "calendarEvents", id));
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <CardContainer title="📅 Calendar">
      <form onSubmit={handleAddEvent} className="calendar-form">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <div className="event-list">
        {events.length === 0 && <p>No events yet. Add your first!</p>}
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <div>
              <h4>{event.title}</h4>
              <p>{event.date}</p>
            </div>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    </CardContainer>
  );
};

export default CalendarPage;
