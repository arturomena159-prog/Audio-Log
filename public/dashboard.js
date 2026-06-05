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

// Escucha si hay un usuario logueado. Todo el código de la página va dentro de aquí
// para que nadie pueda ver los datos sin estar autenticado. Si no hay sesión, manda al login.
auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // Escucha en tiempo real la colección "clients", filtrando solo los del usuario actual.
    // Cada vez que se agrega o borra un cliente, esta función se ejecuta automáticamente
    // y redibuja la lista completa desde cero.
    db.collection("clients").where("userId", "==", user.uid).onSnapshot(function(snapshot) {
        const list = document.getElementById("clients-list");
        list.innerHTML = "";
        snapshot.forEach(function(doc) {
            const li = document.createElement("li");
            // En vez de solo mostrar el nombre, lo convertimos en un link.
            // La URL lleva el id del cliente para que client.html sepa cuál cargar.
            const a = document.createElement("a");
            a.textContent = doc.data().name + " (" + doc.data().type + ")";
            a.href = "client.html?id=" + doc.id;
            li.appendChild(a);
            list.appendChild(li);
        });

        
    });

    db.collection("sessions").where("userId", "==", user.uid).onSnapshot(function(snapshot) {
        let totalSeconds = 0;
        snapshot.forEach(function(doc) {
            totalSeconds += doc.data().seconds;
        });
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        document.getElementById("total-hours").textContent = h + "h " + m + "m";
    });

    db.collection("projects").where("userId", "==", user.uid).onSnapshot(function(snapshot) {
        let totalBilled = 0;
        let totalPending = 0;
        snapshot.forEach(function(doc) {
            const data = doc.data();
            if (data.paymentType === "fixed" && data.amount) {
                if (data.paymentStatus === "Paid") {
                    totalBilled += data.amount;
                } else if (data.paymentStatus === "Pending" || data.paymentStatus === "Partial") {
                    totalPending += data.amount;
                }
            }
        });
        document.getElementById("total-billed").textContent = "$" + totalBilled.toFixed(2);
        document.getElementById("total-pending").textContent = "$" + totalPending.toFixed(2);


        const projectsArray = [];
        snapshot.forEach(function(doc) {
            projectsArray.push({ id: doc.id, ...doc.data() });
        });

        projectsArray.sort(function(a, b) {
            if (!a.deliveryDate) return 1;
            if (!b.deliveryDate) return -1;
            return a.deliveryDate > b.deliveryDate ? 1 : -1;
        });

        const projectsList = document.getElementById("projects-list");
        projectsList.innerHTML = "";
        projectsArray.forEach(function(project) {
            const li = document.createElement("li");

            const a = document.createElement("a")
            a.textContent = project.name;
            a.href = "project.html?id=" + project.id;

            const date = document.createElement("span");
            date.textContent = project.deliveryDate ? " - Due: " + project.deliveryDate : " - No date";

            const progress = project.progress !== undefined ? project.progress : 0;
            const bar = document.createElement("progress");
            bar.value = progress;
            bar.max = 100;

            const progressText = document.createElement("span");
            progressText.textContent = " " + progress + "%"

            li.appendChild(a);
            li.appendChild(date);
            li.appendChild(bar);
            li.appendChild(progressText);
            projectsList.appendChild(li);
        });



    });

    
});

// Cierra la sesión del usuario y lo manda de regreso al login
document.getElementById("logout").addEventListener("click", function() {
    auth.signOut().then(function() {
        window.location.href = "index.html";
    });
});

// Abre un prompt para escribir el nombre del nuevo cliente y lo guarda en Firestore.
// Guarda también el userId para que cada usuario solo vea sus propios clientes.
document.getElementById("add-client").addEventListener("click", function() {
   document.getElementById("new-client-form").style.display = "block";
});

document.getElementById("cancel-client").addEventListener("click", function() {
        document.getElementById("new-client-form").style.display = "none";
});


document.getElementById("save-client").addEventListener("click", function() {
    const name = document.getElementById("client-name-input").value;
    const type = document.getElementById("client-type-input").value;
    if (name && type) {
        db.collection("clients").add({
            name: name,
            type: type,
            userId: auth.currentUser.uid
        });
        document.getElementById("new-client-form").style.display = "none";
    }
});






