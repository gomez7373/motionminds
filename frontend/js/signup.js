document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Placeholder logic to handle signup
    alert(`Sign-up successful! Welcome, ${name}! A confirmation email has been sent to ${email}.`);
    window.location.href = "login.html"; // Redirect to login after successful signup
});
