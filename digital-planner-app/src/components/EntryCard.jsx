import React from "react";

const EntryCard = ({
  title,
  description,
  date,
  onDelete,
  onMarkDone,
  isCompleted,
}) => {
  return (
    <div className="entry-card">
      <h3 className={isCompleted ? "completed" : ""}>{title}</h3>
      {description && <p>{description}</p>}
      {date && <small>{date}</small>}
      <div className="entry-actions">
        {onMarkDone && (
          <button onClick={onMarkDone} className="mark-btn">
            {isCompleted ? "Undo" : "Mark as Done"}
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="delete-btn">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EntryCard;
import "../styles/components.css";
