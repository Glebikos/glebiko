// Инициализация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5N4XF_YPXNJOjfGen-GKJwS3a5yAQ9WE",
  authDomain: "basedata-83f1b.firebaseapp.com",
  projectId: "basedata-83f1b",
  storageBucket: "basedata-83f1b.appspot.com",
  messagingSenderId: "1093638687251",
  appId: "1:1093638687251:web:aac7aef2b0b2d2f610cde6"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Слушаем событие отправки формы
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем стандартное действие формы (перезагрузку страницы)

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Вход пользователя в Firebase
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Успешный вход
            document.getElementById("response").innerHTML = "Вход успешен.";
        })
        .catch((error) => {
            // Обработка ошибок при входе
            document.getElementById("response").innerHTML = "Ошибка: " + error.message;
        });
});
