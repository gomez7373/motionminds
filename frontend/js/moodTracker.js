document.querySelectorAll('.mood-icon').forEach(icon => {
    icon.addEventListener('click', function () {
        const mood = this.alt; // Get the mood from the alt attribute of the image
        alert(`You selected: ${mood}`);
        // Here, you can add functionality to save the selected mood
    });
});
