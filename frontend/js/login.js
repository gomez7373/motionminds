document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Placeholder logic to handle login
    if (email === "user@example.com" && password === "password") {
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect after successful login
    } else {
        alert("Incorrect email or password. Please try again or use the 'Forgot Password' link.");
    }
});
