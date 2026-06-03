// Configuración de Firebase — estas claves identifican nuestro proyecto en Firebase.
// Sin esto, la app no sabe a qué base de datos conectarse.

const firebaseConfig = {
    apiKey: "AIzaSyBMFDWMqVT8GUxf1ZTHnCiL9mmvrV98W9Q",
  authDomain: "audio-log-b1c37.firebaseapp.com",
  projectId: "audio-log-b1c37",
  storageBucket: "audio-log-b1c37.firebasestorage.app",
  messagingSenderId: "755276953395",
  appId: "1:755276953395:web:985819a760bafadaddf046"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Lee el id del cliente desde la URL (ej: client.html?id=abc123).
// Cuando el usuario hace clic en un cliente en el dashboard, lo manda a esta página
// con el id del cliente en la URL. Aquí lo capturamos para saber qué cliente cargar.

const clientId = new URLSearchParams(window.location.search).get("id");


// Escucha si hay un usuario logueado. Todo el código de la página va dentro de aquí
// para que nadie pueda ver los datos sin estar autenticado. Si no hay sesión, manda al login.

auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // Busca el documento del cliente en Firestore usando su id,
    // luego toma su nombre y lo pone en el <h1> del header.

    db.collection("clients").doc(clientId).get().then(function(doc) {
        document.getElementById("client-name").textContent = doc.data().name;
    });



//Muestra el formulario de nuevo proyecto cuando el usuario hace clic en "+Add Project"

   document.getElementById("add-project").addEventListener("click", function() {
      document.getElementById("new-project-form").style.display = "block";
   });


//Oculta el formulario sin guardar nada si el usuario cancela
    document.getElementById("cancel-project").addEventListener("click", function() {       
        document.getElementById("new-project-form").style.display = "none";
    });

//Lee el nombre y el tipo de formulario y guarda el proyecto nuevo en Firestore
    document.getElementById("save-project").addEventListener("click", function() {
        const name = document.getElementById("project-name-input").value;
        const type = document.getElementById("project-type-input").value;

        if (name && type) {
            db.collection("projects").add({
                name: name,
                type: type,
                clientId: clientId,
                userId: user.uid

            });
            document.getElementById("new-project-form").style.display = "none";
        }
    });




    // Escucha en tiempo real todos los proyectos que pertenecen a este cliente.
    // Cada vez que se agrega o borra un proyecto, esta función se ejecuta automáticamente
    // y redibuja la lista completa desde cero.

    db.collection("projects").where("clientId", "==", clientId).onSnapshot(function(snapshot) {
        const list = document.getElementById("projects-list");
        list.innerHTML = "";
        snapshot.forEach(function(doc) {
            const li = document.createElement("li");

            // Cada proyecto se convierte en un link que lleva a project.html,
            // pasando el id del proyecto en la URL para que esa página sepa cuál cargar.

            const a = document.createElement("a");
            a.textContent = doc.data().name + " (" + doc.data().type + ")";
            a.href = "project.html?id=" + doc.id;
            li.appendChild(a);
            list.appendChild(li);
        });
    });
});
