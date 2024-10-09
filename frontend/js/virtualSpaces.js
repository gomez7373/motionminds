document.querySelectorAll('.space-option').forEach(button => {
    button.addEventListener('click', function () {
        alert(`Entering the virtual space: ${this.textContent}`);
        // Here, you can add functionality to load a virtual environment
    });
});
