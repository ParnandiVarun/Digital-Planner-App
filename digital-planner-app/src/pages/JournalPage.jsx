import React, { useEffect, useState } from "react";
import { addJournal, getJournals, deleteJournal } from "../api/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import EntryCard from "../components/EntryCard";
import CardContainer from "../components/CardContainer";
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
    <CardContainer title="My Journal">
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
        {journals.length === 0 && <p>No journal entries yet.</p>}
        {journals.map((journal) => (
          <EntryCard
            key={journal.id}
            title={journal.title}
            description={journal.content}
            date={journal.date}
            onDelete={() => handleDelete(journal.id)}
          />
        ))}
      </div>
    </CardContainer>
  );
};

export default JournalPage;
