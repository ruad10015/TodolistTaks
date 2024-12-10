import React, { useState } from 'react';
import TodoList from './TodoList';
import ConfirmDialog from './ConfirmDialog';
import './App.css'; 

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Write Code', completed: true, time: '2:51' },
    { id: 2, text: 'Eat Food', completed: false, time: '5:12' },
    { id: 3, text: 'Sleep', completed: true, time: '7:42' },
    { id: 4, text: 'Watch YouTube', completed: false, time: '10:24' },
    { id: 5, text: 'Talk With Friend', completed: false, time: '11:53' },
    { id: 6, text: 'Read Book', completed: true, time: '2:16' },
  ]);

  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = (text, time) => {
    if (text.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    if (!time) {
      alert("Please write and indicate the time!");
      return;
    }
    setTasks([...tasks, { id: Date.now(), text, completed: false, time }]);
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setTaskToDelete(null);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input type="text" id="new-task" placeholder="Enter task" />
        <input type="time" id="task-time" />
        <button onClick={() => {
          const taskInput = document.getElementById('new-task');
          const timeInput = document.getElementById('task-time');
          addTask(taskInput.value, timeInput.value);
          taskInput.value = '';
          timeInput.value = '';
        }}>ADD</button>
      </div>
      <TodoList tasks={tasks} onToggleComplete={toggleComplete} onDeleteTask={setTaskToDelete} />
      {taskToDelete && (
        <ConfirmDialog 
          task={taskToDelete} 
          onConfirm={() => deleteTask(taskToDelete.id)} 
          onCancel={() => setTaskToDelete(null)} 
        />
      )}
    </div>
  );
};

export default App;
