const firebaseConfig = {
  apiKey: "AIzaSyBMFDWMqVT8GUxf1ZTHnCiL9mmvrV98W9Q",
  authDomain: "audio-log-b1c37.firebaseapp.com",
  projectId: "audio-log-b1c37",
  storageBucket: "audio-log-b1c37.firebasestorage.app",
  messagingSenderId: "755276953395",
  appId: "1:755276953395:web:985819a760bafadaddf046",
  measurementId: "G-3WPL3C02M7"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        alert("Successful Login!");
    })
        .catch(function(error) {
            alert(error.message);
        });
    });