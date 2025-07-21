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
import "../styles/notification.css";

const NotificationPage = () => {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {
    if (!user) return;
    const notificationsRef = collection(db, "users", user.uid, "notifications");
    const snapshot = await getDocs(notificationsRef);
    const notificationsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNotifications(notificationsList);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const handleAddNotification = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      await addDoc(collection(db, "users", user.uid, "notifications"), {
        message,
        createdAt: serverTimestamp(),
      });
      setMessage("");
      fetchNotifications();
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "notifications", id));
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <CardContainer title="🔔 Notifications">
      <form onSubmit={handleAddNotification} className="notification-form">
        <input
          type="text"
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Add Notification</button>
      </form>

      <div className="notification-list">
        {notifications.length === 0 && <p>No notifications yet.</p>}
        {notifications.map((notif) => (
          <div key={notif.id} className="notification-item">
            <p>{notif.message}</p>
            <button onClick={() => handleDelete(notif.id)}>Dismiss</button>
          </div>
        ))}
      </div>
    </CardContainer>
  );
};

export default NotificationPage;
