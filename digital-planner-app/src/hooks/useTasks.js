import { useState, useEffect } from "react";
import { db } from "../api/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";

const useTasks = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "users", user.uid, "tasks"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  const addTask = async (task) => {
    await addDoc(collection(db, "users", user.uid, "tasks"), {
      ...task,
      completed: false,
      createdAt: serverTimestamp(),
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "tasks", id));
  };

  const updateTask = async (id, updatedTask) => {
    await updateDoc(doc(db, "users", user.uid, "tasks", id), updatedTask);
  };

  return { tasks, addTask, deleteTask, updateTask, loading };
};

export default useTasks;
