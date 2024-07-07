import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const statusRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(collection(db, "tasks"), where("uid", "==", auth.currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = [];
        snapshot.forEach((doc) => tasksData.push({ ...doc.data(), id: doc.id }));
        setTasks(tasksData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "tasks"), {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
      uid: auth.currentUser.uid,
    });

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    statusRef.current.value = "To Do";
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "tasks", id), { status });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl mb-6">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
      >
        Logout
      </button>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            ref={titleRef}
            required
            placeholder="Task Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <textarea
            ref={descriptionRef}
            required
            placeholder="Task Description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <select
            ref={statusRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 border rounded shadow">
              <h2 className="text-xl">{task.title}</h2>
              <p>{task.description}</p>
              <div className="flex items-center mt-2">
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  className="mr-2"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
