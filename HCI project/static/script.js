document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href = '/dates.html';
    // Collect form data
    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        sport: document.getElementById("sports").value,
        date: document.getElementById("date").value
    };
    // Send data to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // Registration successful, redirect to another page
            window.location.href = '/dates.html';
        } else {
            // Handle server-side errors here
            console.error('Registration failed');
        }
    })  
    .then(message => {
        // Display success message
        document.getElementById("message").textContent = message;
        // Redirect to another page after registration
        window.location.href = '/dates.html';
    })
    .catch(error => console.error(error));
});
