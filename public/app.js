// Configuración de Firebase — estas son las credenciales de tu proyecto en Firebase Console
// Firebase las usa para saber a qué base de datos y proyecto conectarse
// const = constant
const firebaseConfig = {
  apiKey: "AIzaSyBMFDWMqVT8GUxf1ZTHnCiL9mmvrV98W9Q",
  authDomain: "audio-log-b1c37.firebaseapp.com",
  projectId: "audio-log-b1c37",
  storageBucket: "audio-log-b1c37.firebasestorage.app",
  messagingSenderId: "755276953395",
  appId: "1:755276953395:web:985819a760bafadaddf046",
  measurementId: "G-3WPL3C02M7"
};

// Inicializa Firebase con la configuración de arriba
firebase.initializeApp(firebaseConfig);

// Crea una referencia al servicio de autenticación de Firebase
// La guardamos en "auth" para usarla más fácil en todo el archivo
const auth = firebase.auth();

// Escucha cuando el usuario envía el formulario de login (click en "Log in")
// e.preventDefault() evita que la página se recargue al hacer submit — comportamiento por defecto de los formularios
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Lee lo que el usuario escribió en los campos de email y contraseña
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Le pide a Firebase que intente iniciar sesión con esas credenciales
    // .then() = si Firebase dice que sí → muestra "Successful Login!"
    // .catch() = si Firebase dice que no → muestra el mensaje de error que Firebase nos da
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        window.location.href = "dashboard.html";

    })
    .catch(function(error) {
        alert(error.message);
    });
});

// Escucha cuando el usuario hace click en "Create account"
document.getElementById("create-account").addEventListener("click", function() {

    // Lee los campos igual que en el login
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Le pide a Firebase que cree una cuenta nueva con ese email y contraseña
    // .then() = cuenta creada → muestra confirmación
    // .catch() = algo falló (email ya existe, contraseña muy corta, etc.) → muestra el error
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        alert("Account created successfully!");
    })
    .catch(function(error) {
        alert(error.message);
    });
});
