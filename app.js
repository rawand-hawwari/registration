
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGn2fsMRxZqSIwhnlM3B-MAsO1olnirHE",
  authDomain: "registration-57a48.firebaseapp.com",
  projectId: "registration-57a48",
  storageBucket: "registration-57a48.appspot.com",
  messagingSenderId: "37495642441",
  appId: "1:37495642441:web:8b28f3c1fe54dce98ea298",
  measurementId: "G-51DDVTD6Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var phone = document.getElementById("phone");

window.signup = function (e) {
  e.preventDefault();


  if (username.value.includes(' ')) {
    alert('Username cannot contain spaces.');
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    alert('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert('Invalid email format.');
    return;
  }

  const phoneRegex = /^07\d{8}$/;
  if (!phoneRegex.test(phone.value)) {
    alert('Invalid phone number format. It should start with 07 and have 10 digits.');
    return;
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(function (userCredential) {
      alert('User already exists. Please log in.');
    })
    .catch(function (error) {

      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(function (success) {
          alert("Signup successful");
        })
        .catch(function (err) {
          alert("Error: " + err.message);
        });
    });

  console.log(obj);
};