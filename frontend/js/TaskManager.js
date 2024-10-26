document.getElementById('saveButton').addEventListener('click', function () {
    const tasks = document.querySelectorAll('#taskList input[type="checkbox"]');
    tasks.forEach(task => {
        console.log(`${task.nextSibling.textContent.trim()}: ${task.checked ? 'Completed' : 'Pending'}`);
    });

    alert("Progress saved!");
    // Add logic to save progress to the backend or local storage
});
