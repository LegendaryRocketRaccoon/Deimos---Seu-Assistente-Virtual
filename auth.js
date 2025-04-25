import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyB8Ji1solW904fstUbIUcHCD8RnRn8CTsI",
    authDomain: "deimos---ia.firebaseapp.com",
    databaseURL: "https://deimos---ia-default-rtdb.firebaseio.com",
    projectId: "deimos---ia",
    storageBucket: "deimos---ia.firebasestorage.app",
    messagingSenderId: "418940529875",
    appId: "1:418940529875:web:feebf6b23874ab81d8b826",
    measurementId: "G-8ZDZ0Y837M"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


window.login = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário logado:", user.email);
            localStorage.setItem("usuarioEmail", user.email);
            window.location.href = "safephobos.html";
        })
        .catch((error) => {
            console.error("Erro no login:", error.message);
            alert("Erro ao fazer login: " + error.message);
        });
};


window.cadastrar = function () {
    const newEmail = document.getElementById("new-email").value;
    const newPassword = document.getElementById("new-password").value;

    createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then((userCredential) => {
            console.log("Usuário cadastrado:", userCredential.user.email);
            alert("Cadastro realizado com sucesso!");
            document.getElementById("cadastro-mensagem").innerText = "Cadastro realizado com sucesso!";
        })
        .catch((error) => {
            console.error("Erro no cadastro:", error.message);
            document.getElementById("cadastro-mensagem").innerText = "Erro ao cadastrar: " + error.message;
        });
};


window.esqueciSenha = function () {
    const email = document.getElementById("email").value;

    if (!email) {
        alert("Por favor, insira seu e-mail antes de solicitar a redefinição de senha.");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("E-mail de redefinição de senha enviado! Verifique sua caixa de entrada.");
        })
        .catch((error) => {
            console.error("Erro ao enviar e-mail de redefinição de senha:", error.message);
            alert("Erro ao enviar e-mail: " + error.message);
        });
};


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário autenticado:", user.email);
    } else {
        console.log("Nenhum usuário logado.");
    }
});