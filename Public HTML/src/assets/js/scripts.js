document.addEventListener('DOMContentLoaded', function() {
    // Function to handle ATS checker form submission
    const atsForm = document.getElementById('ats-checker-form');
    if (atsForm) {
        atsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fileInput = document.getElementById('resume-upload');
            const file = fileInput.files[0];
            if (file) {
                // Process the file and check ATS score
                checkATSScore(file);
            } else {
                alert('Please upload a resume file.');
            }
        });
    }

    // Function to handle resume builder form submission
    const resumeForm = document.getElementById('resume-form');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Gather user inputs and create resume
            createResume();
        });
    }

    // Function to handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    // Function to handle sign-up form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            signup(username, email, password);
        });
    }

    // Function to check ATS score
    function checkATSScore(file) {
        // Logic to upload file and get ATS score
        // Placeholder for actual implementation
        alert('ATS score checked for: ' + file.name);
    }

    // Function to create resume
    function createResume() {
        // Logic to gather inputs and generate resume
        // Placeholder for actual implementation
        alert('Resume created successfully!');
    }

    // Function to handle login
    function login(username, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('authenticated', 'true');
            window.location.href = '../../index.html';
        } else {
            alert('Invalid username or password');
        }
    }

    // Function to handle sign-up
    function signup(username, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert('Username already exists');
        } else {
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('User signed up successfully');
            window.location.href = 'login.html';
        }
    }
    function saveUser(username, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Function to check if user is authenticated
    function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const publicPages = ['home.html', 'login.html', 'signup.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (!isAuthenticated && !publicPages.includes(currentPage)) {
        console.warn('Unauthenticated access attempt detected. Redirecting to login...');
        window.location.href = 'login.html';
    }
}

    // Check authentication on page load
    checkAuthentication();
});
