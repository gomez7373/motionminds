import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Content from '../components/Content';

function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    verifyUser();
    fetchTasks();
  }, []);

  const verifyUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error verifying user:', error);
      setMessage('Failed to verify user');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todo/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage('Failed to fetch tasks');
    }
  };

  const handleTaskChange = (taskId, isCompleted) => {
    setTasks(tasks.map(task => task._id === taskId ? { ...task, is_completed: isCompleted } : task));
  };

  const handleSaveProgress = async () => {
    try {
      await Promise.all(tasks.map(task => {
        if (task && task._id) {
          return axios.put(`http://localhost:3000/api/todo/${task._id}`, {
            is_completed: task.is_completed
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        }
        return Promise.resolve(); // Skip undefined tasks or tasks without _id
      }));
      setMessage('Progress saved successfully!');
    } catch (error) {
      console.error('Error saving progress:', error);
      setMessage('Failed to save progress');
    }
  };

  const handleAddTask = async () => {
    if (!newTask) {
      setMessage('Please enter a task description');
      return;
    }

    if (!userId) {
      setMessage('User not authenticated');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/todo', {
        task_description: newTask
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNewTask('');
      setMessage('Task added successfully!');
      fetchTasks(); // Fetch the updated list of tasks
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Failed to add task');
    }
  };

  return (
    <Content>
      <header>
        <h1>Today's Tasks</h1>
      </header>
      <section id="task-section">
        <ul id="taskList">
          {Array.isArray(tasks) && tasks.map(task => (
            task && (
              <li key={task._id}>
                <input
                  type="checkbox"
                  checked={task.is_completed || false}
                  onChange={(e) => handleTaskChange(task._id, e.target.checked)}
                /> {task.task_description || 'No description'}
              </li>
            )
          ))}
        </ul>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task description"
          className='text-gray-600'
        />
        <button className="mr-10" onClick={handleAddTask}>Add Task</button>
        <button onClick={handleSaveProgress}>Save Progress</button>
        {message && <p className="message">{message}</p>}
      </section>
      <div id="taskDisplay">
        <h1>Tasks</h1>
        {Array.isArray(tasks) && tasks.map(task => (
          task && (
            <div key={task._id}>
              {task.task_description || 'No description'}
            </div>
          )
        ))}
      </div>
    </Content>
  );
}

export default Checklist;