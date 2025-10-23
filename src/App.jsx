import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");         // Input field
  const [tasks, setTasks] = useState(() => {    // Tasks array
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editIndex, setEditIndex] = useState(null); // Track editing task

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or update task
  const handleAddUpdate = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      // Update existing task
      const newTasks = [...tasks];
      newTasks[editIndex].text = task;
      setTasks(newTasks);
      setEditIndex(null); // reset edit mode
    } else {
      // Add new task
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask(""); // Clear input
  };

  // Edit task
  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  // Toggle completed
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1>React To-Do (Add / Update / Delete)</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(index)}>{t.text}</span>
            <div>
              <button onClick={() => handleEdit(index)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => deleteTask(index)} className="delete-btn">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
