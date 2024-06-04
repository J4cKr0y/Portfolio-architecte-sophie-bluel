const login = "http://localhost:5678/api/users/login/";
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const loginError = document.getElementById("login_error");
const submitButton = document.getElementById("se_connecter");

document.getElementById('se_connecter').addEventListener('click', async function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
    const email = inputEmail.value;
    const password = inputPassword.value;

    var data = {"email": email, "password": password};

    try {
        const response = await fetch(login, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
        });
        if (response.status != 200) {
            console.error('ALARME ! Déposez votre souris à terre et mettez les mains derrière la tête !');
            alert("Erreur de connexion. Veuillez vérifier votre adresse e-mail ou/et mot de passe, s'il vous plaît.");
            return;
        }
        const logs = await response.json();
        console.log('Succès:', logs, 'Bienvenue chez vous :)');
                
            sessionStorage.setItem('connectOK', 'true'); // Stocke le fait que la connexion a été un succès    
            sessionStorage.setItem('token', logs.token);
            sessionStorage.setItem('userId', logs.userId);
            window.location.href = "index.html"; // Redirige vers index.html en cas de succès
    } catch (error) {
        console.error('Erreur:', error);
    }
});