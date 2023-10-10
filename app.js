// Import the functions you need from the SDKs you need
// import {firebase} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGn2fsMRxZqSIwhnlM3B-MAsO1olnirHE",
  authDomain: "registration-57a48.firebaseapp.com",
  projectId: "registration-57a48",
  storageBucket: "registration-57a48.appspot.com",
  messagingSenderId: "37495642441",
  appId: "1:37495642441:web:9e4d38b598fff3538ea298",
  measurementId: "G-27QBZ7S3V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registrationForm = document.getElementById('registration-form');
registrationForm.addEventListener('submit', async (e) => {
    // e.preventDefault();
    // console.log('hi');
    e.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let phone = document.getElementById('phone').value;

    console.log(`username: ${username}, email: ${email}, password: ${password}, phone: ${phone},`);
    let usernameValidation = '/^[^\s]+$/';
    let emailValidation = '/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/';
    let passwordValidation = '/^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/';
    let phoneValidation = '/^07[789]\d{7}$/';
    console.log(`username: ${usernameValidation}, email: ${emailValidation}, password: ${passwordValidation}, phone: ${phoneValidation},`);

    try{
        const emailExists = await firebase.auth().fetchSignInMethodsForEmail(email);

        if(usernameValidation.test(username) && emailValidation.test(email) && passwordValidation.test(password) && phoneValidation.test(phone) && emailExists.length == 0){
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            alert('Registration successful');
        }else{
            if(emailExists.length > 0){
                alert('Email already exists. Please use a different email address.');
                return;
            }
            if(!usernameValidation.test(username)){
                alert("Username can only contain letters or numbers.");
                return;
            }
            if(!emailValidation.test(email)){
                alert("Please enter valid Email Address.");
                return;
            }
            if(!passwordValidation.test(password)){
                alert("Password must consist of more than 8 characters, with at least 1 number, uppercase, and special characters.");
                return;
            }
            if(!phoneValidation.test(phone)){
                alert("Please enter valid Phone Number.");
                return;
            }
        }
    }catch (error) {
        alert(`Registration failed: ${error.message}`);
    }
});