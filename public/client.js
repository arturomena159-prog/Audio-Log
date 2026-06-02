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

const clientId = new URLSearchParams(window.location.search).get("id");


auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    db.collection("clients").doc(clientId).get().then(function(doc) {
        document.getElementById("client-name").textContent = doc.data().name;
    });

    document.getElementById("add-project").addEventListener("click", function() {
        const name = prompt("Project name:");
        if (name) {
            db.collection("projects").add({
                name: name,
                clientId: clientId,
                userId: user.uid
            });
        }
    });

    db.collection("projects").where("clientId", "==", clientId).onSnapshot(function(snapshot) {
        const list = document.getElementById("projects-list");
        list.innerHTML = "";
        snapshot.forEach(function(doc) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = doc.data().name;
            a.href = "project.html?id=" + doc.id;
            li.appendChild(a);
            list.appendChild(li);
        });
    });
});
