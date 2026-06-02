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


const projectId = new URLSearchParams(window.location.search).get("id");

auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    db.collection("projects").doc(projectId).get().then(function(doc) {
        document.getElementById("project-name").textContent = doc.data().name;
        document.getElementById("back-link").href = "client.html?id=" + doc.data().clientId;
    });
    db.collection("sessions").where("projectId", "==", projectId).onSnapshot(function(snapshot) {
        let totalSeconds = 0;
        snapshot.forEach(function(doc) {
            totalSeconds += doc.data().seconds;
        });
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        document.getElementById("total-hours").textContent = h + "h" + m + "m"
    });
});


let timerInterval = null;
let seconds = 0;

document.getElementById("start-timer").addEventListener("click", function() {
    document.getElementById("start-timer").disabled = true;
    document.getElementById("stop-timer").disabled = false;

    timerInterval = setInterval(function() {
        seconds++;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        document.getElementById("timer-display").textContent =
            String(h).padStart(2, "0") + ":" +
            String(m).padStart(2, "0") + ":" +
            String(s).padStart(2, "0");
    }, 1000);
});

document.getElementById("pause-timer").addEventListener("click", function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("pause-timer").textContent = "Resume";
        document.getElementById("start-timer").disabled = false
    } else {
        document.getElementById("start-timer").click();
        document.getElementById("pause-timer").textContent = "Pause";
    }
});

document.getElementById("stop-timer").addEventListener("click", function() {
    clearInterval(timerInterval);
    document.getElementById("start-timer").disabled = false;
    document.getElementById("stop-timer").disabled = true;
    document.getElementById("pause-timer").textContent = "Pause"

    db.collection("sessions").add({
        projectId: projectId,
        userId: auth.currentUser.uid,
        seconds: seconds,
        date: new Date()
    });

    seconds = 0;
    document.getElementById("timer-display").textContent = "00:00:00";
});