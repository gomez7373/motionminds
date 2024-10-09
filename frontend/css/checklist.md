/* General Body Styling */
body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    background: linear-gradient(135deg, #3b0d8a, #1b1464, #007080); /* Gradient background as per your preference */
    color: #ffffff; /* White text for better contrast */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Task Checklist Section */
#task-section {
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    width: 400px;
    box-sizing: border-box;
}

/* Header Styling */
#task-section h2 {
    color: #ffffff;
    margin-bottom: 20px;
    text-align: center;
}

/* Task List Styling */
#taskList {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

#taskList li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
}

/* Checkbox Styling */
input[type="checkbox"] {
    transform: scale(1.3);
    margin-right: 10px;
}

/* Save Button Styling */
#saveButton {
    width: 100%;
    padding: 15px;
    background-color: #007080; /* Button color matches the theme */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #ffffff;
    font-size: 18px;
    transition: background-color 0.3s, transform 0.2s;
    margin-top: 20px;
}

#saveButton:hover {
    background-color: #0056b3; /* Hover effect with darker blue */
    transform: scale(1.05);
}

/* Task Completion Styling */
#taskList li.completed {
    text-decoration: line-through;
    color: #cccccc;
}
