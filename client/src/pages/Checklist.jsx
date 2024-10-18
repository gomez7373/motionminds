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
  const [currentDate, setCurrentDate] = useState('');
  const [predefinedTasksAdded, setPredefinedTasksAdded] = useState(false);
  const navigate = useNavigate();

  const predefinedTodos = [
    { task_description: 'Brush teeth' },
    { task_description: 'Shower' },
    { task_description: 'Drink water' },
    { task_description: 'Exercise' },
    { task_description: 'Expose to sunlight' },
    { task_description: 'Fix bed' },
    { task_description: 'Take meds' },
    { task_description: 'Eat breakfast' }
  ];
  
  const addPredefinedTodos = async () => {
    const existingTaskDescriptions = tasks.map(task => task.task_description);
    const newPredefinedTodos = predefinedTodos.filter(todo => !existingTaskDescriptions.includes(todo.task_description));

    if (newPredefinedTodos.length > 0) {
      try {
        const response = await axios.post('http://localhost:3000/api/todo/predefined', newPredefinedTodos, { withCredentials: true });
        setTasks([...tasks, ...response.data.todos]);
        setPredefinedTasksAdded(true);
      } catch (error) {
        console.error('Error adding predefined tasks:', error);
        setMessage('Failed to add predefined tasks');
      }
    } else {
      setPredefinedTasksAdded(true);
    }
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);

    axios.get('http://localhost:3000/api/user', { 
        withCredentials: true 
    })
    .then(res => {
        const { user } = res.data; // Extract user from response data
        setUser(user);
        return axios.get('http://localhost:3000/api/todo/today', { withCredentials: true });
    })
    .then(res => {
        setTasks(res.data);
        setLoading(false);
        if (!res.data.some(task => predefinedTodos.some(todo => todo.task_description === task.task_description))) {
          addPredefinedTodos(); // Add predefined todos if not already added
        } else {
          setPredefinedTasksAdded(true);
        }
    })
    .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
            navigate('/login'); // Redirect to login if unauthorized
        }
    });
}, [navigate]);

const handleTaskChange = async (taskId, isCompleted) => {
  try {
    // Find the task to update
    const updatedTask = tasks.find(task => task._id === taskId);
    if (!updatedTask) return;

    // Update the task locally
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, is_completed: isCompleted } : task
    );
    setTasks(updatedTasks);

    // Send the individual update request
    await axios.put(`http://localhost:3000/api/todo/${taskId}`, 
      { ...updatedTask, is_completed: isCompleted }, 
      { withCredentials: true }
    );

    setMessage('Task updated successfully');
  } catch (error) {
    console.error('Error updating task:', error);
    setMessage('Failed to update task');
  }
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
/*
  const handleSaveProgress = async () => {
    try {
      const updatePromises = tasks.map(task =>
        axios.put(`http://localhost:3000/api/todo/${task._id}`, task, { withCredentials: true })
      );
      const results = await Promise.allSettled(updatePromises);
      const failedUpdates = results.filter(result => result.status === 'rejected');
      if (failedUpdates.length > 0) {
        console.error('Some tasks failed to update:', failedUpdates);
        setMessage('Failed to save progress for some tasks');
      } else {
        setMessage('Progress saved successfully');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      setMessage('Failed to save progress');
    }
  };
*/
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
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
        <p>{currentDate}</p> {/* Display the current date */}
      </header>
      <section id="task-section">
        <ul id="taskList">
  {Array.isArray(tasks) && tasks.map(task => (
    task && (
      <li key={task._id || task.task_description}>
        <input
          type="checkbox"
          checked={task.is_completed === true}
          onChange={(e) => handleTaskChange(task._id, e.target.checked)}
        /> {task.task_description || 'No description'}
      </li>
    )
  ))}
</ul>
        {predefinedTasksAdded && (
          <>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="New task description"
              className='text-gray-600'
            />
            <button className="mr-10" onClick={handleAddTask}>Add Task</button>
          </>
        )}
        {message && <p className="message">{message}</p>}
      </section>
      
    </Content>
  );
}

export default Checklist;