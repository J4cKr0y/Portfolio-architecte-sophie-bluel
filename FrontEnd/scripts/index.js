const api = "http://localhost:5678/api/";
const cat = "http://localhost:5678/api/categories/";
//id : 1,name : Objets; 2,Appartements; 3,Hotels & restaurants
const works = "http://localhost:5678/api/works/";
//id(1à11), title, imageUrl, categoryId, userId, category{id, name,Objets}

//Mise à jour de la page si connecté/déconnecté
function isConnected() {
  if (sessionStorage.getItem("connectOK") === "true") {
    document.getElementById("edition_ban").style.display = "block";
    document.getElementById("editbtn").style.display = "flex";
    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.href = "index.html";
      loginLink.textContent = "logout";
      loginLink.addEventListener("click", function () {
        sessionStorage.removeItem("connectOK");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        document.getElementById("edition_ban").style.display = "none";
      });
    }
  }
}

//Ajoute la classe 'active' à l'élément cliqué et envoi vers la fonction de tri
function boutonFiltreActif() {
  document
    .querySelectorAll("#filtre > div")
    .forEach((el) => el.classList.remove("active"));
  this.classList.add("active");
  appelerFonction(this.id);
}

async function chargerFiltres() {
  /****  Requête GET categories  ****/
  const response = await fetch(cat);
  const categories = await response.json();

  // filtre de la page principale
  const divFiltre = document.getElementById("filtre");
  const tous = document.createElement("div");
  tous.classList.add("active");
  tous.id = "tous";
  tous.textContent = "Tous";
  tous.dataset.categoryId = tous.id;
  tous.classList.add("category");
  tous.addEventListener("click", boutonFiltreActif);
  divFiltre.appendChild(tous);
  categories.forEach((category) => {
    const option = document.createElement("div");
    option.textContent = category.name;
    option.id = category.name.split(" ")[0];
    option.dataset.categoryId = category.id;
    option.classList.add("category");
    option.addEventListener("click", boutonFiltreActif);
    divFiltre.appendChild(option);
  });

  // filtres de la modale
  const selectMenu = document.getElementById("cat-select");
  categories.forEach((category) => {
    const opt = document.createElement("option");
    opt.value = category.id;
    opt.textContent = category.name;
    selectMenu.appendChild(opt);
  });
}

//Suppression
async function delWorkById(iD) {
  /**** Requête DELETE works  ****/
  const res = await fetch(works + iD, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
  });

  if (res.ok) {
    resetGallery();
    resetMiniGallery();
    await Promise.all([chargerArticles()]);
  } else {
    alert("Suppression impossible !");
  }
}

let arts = [];
async function chargerArticles() {
  resetGallery();
  resetMiniGallery();
  /**** Requête GET works ****/
  const reponse = await fetch(works);
  const articles = await reponse.json();
  const conteneur = document.getElementsByClassName("gallery");
  const cont2 = document.getElementsByClassName("mini-gallery");

  arts = [];
  articles.forEach((article) => {
    arts.push({
      id: article.id,
      categoryId: article.categoryId,
      imageUrl: article.imageUrl,
      title: article.title,
    });

    const figure = document.createElement("figure");
    figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;

    const fig = document.createElement("figure");
    fig.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
        `;
    //Création icone poubelle
    const divTrash = document.createElement("div");
    divTrash.classList.add("divTrash");
    conteneur[0].appendChild(figure);
    cont2[0].appendChild(fig);
    fig.appendChild(divTrash);
    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash-can";
    trash.id = article.id;
    trash.addEventListener("click", function () {
      const confirmation = confirm(
        "Êtes-vous sûr de vouloir supprimer cet élément ?",
      );
      if (confirmation) {
        delWorkById(trash.id);
      }
    });
    divTrash.appendChild(trash);
  });
}

//vide la gallerie
function resetGallery() {
  const conteneur = document.querySelector(".gallery");
  while (conteneur.firstChild) {
    conteneur.removeChild(conteneur.firstChild);
  }
}
//vide la gallerie de la modale
function resetMiniGallery() {
  const conteneur = document.querySelector(".mini-gallery");
  while (conteneur.firstChild) {
    conteneur.removeChild(conteneur.firstChild);
  }
}

//fonction activée pour une catégorie donnée
async function chargerCategorie(categoryId) {
  resetGallery();
  if (categoryId === "tous") {
    await chargerArticles();
  } else {
    const conteneur = document.getElementsByClassName("gallery");
    for (let article of arts) {
      if (article.categoryId == categoryId) {
        const figure = document.createElement("figure");
        figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;
        conteneur[0].appendChild(figure);
      }
    }
  }
}

//Triage
async function appelerFonction(valeur) {
  const categoryId = document.getElementById(valeur).dataset.categoryId;
  await chargerCategorie(categoryId);
}

// Appel au chargement de la page
window.onload = function () {
  isConnected();
  chargerFiltres();
  chargerArticles();
};
