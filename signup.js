import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJ7RFaClh-5MSeLBGIXQPp-ASLjL6dShE",
    authDomain: "fir-d4c36.firebaseapp.com",
    projectId: "fir-d4c36",
    storageBucket: "fir-d4c36.appspot.com",
    messagingSenderId: "522426955922",
    appId: "1:522426955922:web:4bb9c7c1bcb61bf07c0e4b",
    measurementId: "G-2VMPLENKEY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Reset input fields on load
window.onload = function () {
    document.getElementById("validationEmail").value = "";
    document.getElementById("validationPassword").value = "";
};

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Password validation function
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
}

// Handle form validation
function validateForm(emailInput, passwordInput) {
    let emailValid = validateEmail(emailInput.value.trim());
    let passwordValid = validatePassword(passwordInput.value.trim());

    emailInput.classList.toggle("is-invalid", !emailValid);
    passwordInput.classList.toggle("is-invalid", !passwordValid);

    return emailValid && passwordValid;
}

// Handle sign-in event
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let emailInput = document.getElementById("validationEmail");
    let passwordInput = document.getElementById("validationPassword");

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    if (validateForm(emailInput, passwordInput)) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Login Successful:", userCredential.user);
                window.location.replace("index.html");

            })
            .catch((error) => {
                console.log("Error:", error.message);
              
            });
    }
});
