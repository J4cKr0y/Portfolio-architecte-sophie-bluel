const login = "http://localhost:5678/api/users/login/";
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const loginError = document.getElementById("login_error");
const submitButton = document.getElementById("se_connecter");

document.getElementById('se_connecter').addEventListener('click', async function(event) {
    event.preventDefault(); 
    const email = inputEmail.value;
    const password = inputPassword.value;

    let data = {"email": email, "password": password};

        const response = await fetch(login, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        });
        if (response.status != 200) {
            alert("Erreur dans l’identifiant ou le mot de passe.");
            return;
        }
        const logs = await response.json();    
            sessionStorage.setItem('connectOK', true); 
            sessionStorage.setItem('token', logs.token);
            sessionStorage.setItem('userId', logs.userId);
            window.location.href = "index.html"; 
});