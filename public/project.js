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

// Lee el id del proyecto desde la URL (ej: project.html?id=abc123).
// Cuando el usuario hace clic en un proyecto en client.html, lo manda aquí
// con el id en la URL. Así sabemos qué proyecto cargar.
const projectId = new URLSearchParams(window.location.search).get("id");
let lastTotalSeconds = 0;

function updateFinanceCalculations() {
    const type = document.getElementById("payment-type-input").value;
    if (type === "hourly") {
        const rate = parseFloat(document.getElementById("rate-input").value);
        if (rate) {
            const total = (lastTotalSeconds / 3600) * rate;
            document.getElementById("estimated-total").textContent = "$" + total.toFixed(2);
        }
    } else if (type === "fixed") {
        const amount = parseFloat(document.getElementById("amount-input").value);
        if (amount && lastTotalSeconds >= 3600) {
            const effectiveRate = amount / (lastTotalSeconds / 3600);
            document.getElementById("effective-rate").textContent = "$" + effectiveRate.toFixed(2) + "/hr";
        } else if (amount && lastTotalSeconds < 3600) {
            document.getElementById("effective-rate").textContent = "— (need 1h+)";
        }
    }
}

// Escucha si hay un usuario logueado. Todo el código de la página va dentro de aquí
// para que nadie pueda ver los datos sin estar autenticado. Si no hay sesión, manda al login.
auth.onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // Carga el documento del proyecto desde Firestore usando su id.
    // Con esos datos pone el nombre del proyecto en el <h1> y arma el link "Back"
    // que lleva de regreso al cliente al que pertenece este proyecto.
    db.collection("projects").doc(projectId).get().then(function(doc) {
        document.getElementById("project-name").textContent = doc.data().name;
        document.getElementById("back-link").href = "client.html?id=" + doc.data().clientId;
    });
 

db.collection ("projects").doc(projectId).get().then(function(doc) {
    const data = doc.data();
    if (data.paymentType) {
        document.getElementById("payment-type-input").value = data.paymentType;
        document.getElementById("payment-type-input").dispatchEvent(new Event("change"));
    }

    if (data.rate) {
        document.getElementById("rate-input").value = data.rate;
    }
    if (data.amount) {
        document.getElementById("amount-input").value = data.amount;
    }
    if (data.paymentStatus) {
        document.getElementById("payment-status-input").value = data.paymentStatus;
        document.getElementById("payment-status-input").dispatchEvent(new Event("change"));
    }
    if (data.amountPaid) {
        document.getElementById("amount-paid-input").value = data.amountPaid;
        const remaining = data.amount - data.amountPaid;
        document.getElementById("remaining-amount").textContent = "$" + remaining.toFixed(2);
    }
    if (data.deliveryDate) document.getElementById("delivery-date-input").value = data.deliveryDate;
    if (data.paymentDate) document.getElementById("payment-date-input").value = data.paymentDate;
    if (data.progress !== undefined) {
        document.getElementById("progress-input").value = data.progress;
        document.getElementById("progress-display").textContent = data.progress + "%";
    }


    updateFinanceCalculations();

document.getElementById("add-note").addEventListener("click", function() {
    const text = document.getElementById("note-input").value;
    if (text) {
        db.collection("notes").add({
            projectId: projectId,
            userId: user.uid,
            text: text,
            date: new Date()
        });
        document.getElementById("note-input").value = "";
    }


    db.collection("notes").where("projectId", "==", projectId).orderBy("date").onSnapshot(function(snapshot) {
        const list = document.getElementById("notes-list");
        list.innerHTML = "";
        snapshot.forEach(function(doc) {
            const li = document.createElement("li");
            li.textContent = doc.data().text;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function() {
                db.collection("notes").doc(doc.id).delete();
            });
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });


    });





});




});





    // Escucha en tiempo real todas las sesiones de este proyecto.
    // Cada vez que se guarda una sesión nueva, suma todos los segundos
    // y actualiza el contador de horas totales en pantalla.
    db.collection("sessions").where("projectId", "==", projectId).onSnapshot(function(snapshot) {
        let totalSeconds = 0;
        snapshot.forEach(function(doc) {
            totalSeconds += doc.data().seconds;
        });
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        document.getElementById("total-hours").textContent = h + "h" + m + "m";


        lastTotalSeconds = totalSeconds;
        updateFinanceCalculations();


    });


    document.getElementById("save-finances").addEventListener("click", function() {
        const type = document.getElementById("payment-type-input").value;
        const status = document.getElementById("payment-status-input").value;
        let rate = null;
        let amount = null;

        let amountPaid = null;

        if (type === "hourly") {
            rate = parseFloat(document.getElementById("rate-input").value);
        } else if (type === "fixed") {
            amount = parseFloat(document.getElementById("amount-input").value);
        }

        if (status === "Partial") {
            amountPaid = parseFloat(document.getElementById("amount-paid-input").value);
        }

        db.collection("projects").doc(projectId).update({
            paymentType: type,
            paymentStatus: status,
            rate: rate,
            amount: amount,
            amountPaid: amountPaid
        });
    });


    document.getElementById("save-planning").addEventListener("click", function() {
        const deliveryDate = document.getElementById("delivery-date-input").value;
        const paymentDate = document.getElementById("payment-date-input").value;
        const progress = parseInt(document.getElementById("progress-input").value);

        db.collection("projects").doc(projectId).update({
            deliveryDate: deliveryDate,
            paymentDate: paymentDate,
            progress: progress
        });


    });



});


// timerInterval guarda la referencia al setInterval activo.
// Cuando está corriendo tiene un valor, cuando está parado es null.
let timerInterval = null;

// seconds acumula los segundos de la sesión actual mientras el timer corre.
let seconds = 0;

// Botón Start — deshabilita el botón de Start para que no se pueda clickear dos veces,
// habilita el Stop, y arranca el contador que suma un segundo cada 1000ms (1 segundo).
document.getElementById("start-timer").addEventListener("click", function() {
    document.getElementById("start-timer").disabled = true;
    document.getElementById("stop-timer").disabled = false;

    timerInterval = setInterval(function() {
        seconds++;
        // Convierte los segundos acumulados a formato HH:MM:SS
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        // padStart(2, "0") asegura que siempre haya dos dígitos (ej: "05" en vez de "5")
        document.getElementById("timer-display").textContent =
            String(h).padStart(2, "0") + ":" +
            String(m).padStart(2, "0") + ":" +
            String(s).padStart(2, "0");
    }, 1000);
});

// Botón Pause/Resume — si el timer está corriendo (timerInterval no es null), lo detiene.
// Si ya está detenido, simula un click en Start para reanudarlo.
// También cambia el texto del botón entre "Pause" y "Resume".
document.getElementById("pause-timer").addEventListener("click", function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("pause-timer").textContent = "Resume";
        document.getElementById("start-timer").disabled = false;
    } else {
        document.getElementById("start-timer").click();
        document.getElementById("pause-timer").textContent = "Pause";
    }
});

// Botón Stop — detiene el timer, resetea los botones, guarda la sesión en Firestore
// con el total de segundos acumulados, y reinicia el contador a cero para la próxima sesión.
document.getElementById("stop-timer").addEventListener("click", function() {
    clearInterval(timerInterval);
    document.getElementById("start-timer").disabled = false;
    document.getElementById("stop-timer").disabled = true;
    document.getElementById("pause-timer").textContent = "Pause";

    // Guarda la sesión en Firestore con el id del proyecto, el usuario, los segundos y la fecha
    db.collection("sessions").add({
        projectId: projectId,
        userId: auth.currentUser.uid,
        seconds: seconds,
        date: new Date()
    });

    // Reinicia el contador para que la próxima sesión empiece desde cero
    seconds = 0;
    document.getElementById("timer-display").textContent = "00:00:00";
});



document.getElementById("payment-type-input").addEventListener("change", function() {
    const type = this.value;
    if (type === "hourly") {
        document.getElementById("hourly-fields").style.display = "block";
        document.getElementById("fixed-fields").style.display = "none";
        document.getElementById("charge-fields").style.display = "block";
    } else if (type === "fixed") {
        document.getElementById("hourly-fields").style.display = "none";
        document.getElementById("fixed-fields").style.display = "block";
        document.getElementById("charge-fields").style.display = "block";
    } else {
        document.getElementById("hourly-fields").style.display = "none";
        document.getElementById("fixed-fields").style.display = "none";
        document.getElementById("charge-fields").style.display = "none";
    }

});

document.getElementById("payment-status-input").addEventListener("change", function() {
    if (this.value === "Partial") {
        document.getElementById("partial-paid").style.display = "block";
    } else {
        document.getElementById("partial-paid").style.display = "none";
    }
});

document.getElementById("amount-paid-input").addEventListener("input", function() {
    const total = parseFloat(document.getElementById("amount-input").value);
    const paid = parseFloat(this.value);
    if (total && paid) {
        const remaining = total - paid;
        document.getElementById("remaining-amount").textContent = "$" + remaining.toFixed(2);
    }
});


document.getElementById("progress-input").addEventListener("input", function() {
    document.getElementById("progress-display").textContent = this.value + "%";

});

