import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Content from '../components/Content';

function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/user', { 
        withCredentials: true 
    })
    .then(res => {
        console.log('Current user response:', res.data); // Log the response data
        const { user } = res.data; // Extract user from response data
        setUser(user);
        return axios.get('http://localhost:3000/api/todo', { withCredentials: true });
    })
    .then(res => {
        setTasks(res.data);
        setLoading(false);
    })
    .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
            navigate('/login'); // Redirect to login if unauthorized
        }
    });
}, [navigate]);

  const handleTaskChange = (taskId, isCompleted) => {
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, is_completed: isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = async () => {
    if (newTask.trim() === '') {
      setMessage('Task description cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/todo', { task_description: newTask }, { withCredentials: true });
      setTasks([...tasks, response.data.todo]);
      setNewTask('');
      setMessage('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Failed to add task');
    }
  };

  const handleSaveProgress = async () => {
    try {
      const updatePromises = tasks.map(task =>
        axios.put(`http://localhost:3000/api/todo/${task._id}`, task, { withCredentials: true })
      );
      await Promise.all(updatePromises);
      setMessage('Progress saved successfully');
    } catch (error) {
      console.error('Error saving progress:', error);
      setMessage('Failed to save progress');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Unauthorized. Please log in.</div>;
  }

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
      
    </Content>
  );
}

export default Checklist;