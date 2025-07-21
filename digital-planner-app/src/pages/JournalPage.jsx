import React, { useEffect, useState } from "react";
import {
  addJournal,
  getJournals,
  updateJournal,
  deleteJournal,
} from "../api/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/journal.css";

const JournalPage = () => {
  const { user } = useAuthContext();
  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchJournals = async () => {
    if (user) {
      const data = await getJournals(user.uid);
      setJournals(data);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, [user]);

  const handleAddJournal = async (e) => {
    e.preventDefault();
    if (user) {
      await addJournal(user.uid, {
        title,
        content,
        createdAt: new Date(),
        date: new Date().toISOString().split("T")[0],
      });
      setTitle("");
      setContent("");
      fetchJournals();
    }
  };

  const handleDelete = async (id) => {
    if (user) {
      await deleteJournal(user.uid, id);
      fetchJournals();
    }
  };

  return (
    <div className="journal-container">
      <h2>Daily Journal</h2>
      <form onSubmit={handleAddJournal} className="journal-form">
        <input
          type="text"
          placeholder="Journal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
        ></textarea>
        <button type="submit">Add Entry</button>
      </form>

      <div className="journal-list">
        {journals.map((journal) => (
          <div key={journal.id} className="journal-item">
            <h3>{journal.title}</h3>
            <p>{journal.content}</p>
            <p className="journal-date">{journal.date}</p>
            <button onClick={() => handleDelete(journal.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
