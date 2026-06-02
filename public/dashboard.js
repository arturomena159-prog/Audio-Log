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

auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // Escucha la colección "clients" en tiempo real, filtrando por el usuario actual
    db.collection("clients").where("userId", "==", user.uid).onSnapshot(function(snapshot) {
        const list = document.getElementById("clients-list");
        list.innerHTML = "";
        snapshot.forEach(function(doc) {
            const li = document.createElement("li");
            // En vez de solo mostrar el nombre, lo convertimos en un link
            // La URL lleva el id del cliente para que client.html sepa cuál cargar
            const a = document.createElement("a");
            a.textContent = doc.data().name;
            a.href = "client.html?id=" + doc.id;
            li.appendChild(a);
            list.appendChild(li);
        });
    });
});

document.getElementById("logout").addEventListener("click", function() {
    auth.signOut().then(function() {
        window.location.href = "index.html";
    });
});

document.getElementById("add-client").addEventListener("click", function() {
    const name = prompt("Client name:");
    if (name) {
        db.collection("clients").add({
            name: name,
            userId: auth.currentUser.uid
        });
    }
});
