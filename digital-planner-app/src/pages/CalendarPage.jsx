import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
import "../styles/calendarPage.css";

const CalendarPage = () => {
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    try {
      await addDoc(collection(db, "users", user.uid, "calendarEvents"), {
        title,
        description,
        date: selectedDate.toISOString().split("T")[0],
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "calendarEvents", id));
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="calendar-container">
      <h2>📅 My Calendar</h2>
      <div className="calendar-flex">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="react-calendar"
        />

        <div className="event-section">
          <h3>Events on {selectedDate.toDateString()}</h3>
          <ul>
            {eventsForSelectedDate.length > 0 ? (
              eventsForSelectedDate.map((event) => (
                <li key={event.id}>
                  <strong>{event.title}</strong>
                  <p>{event.description}</p>
                  <button onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No events for this day.</p>
            )}
          </ul>

          <form onSubmit={handleAddEvent} className="event-form">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Add Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
