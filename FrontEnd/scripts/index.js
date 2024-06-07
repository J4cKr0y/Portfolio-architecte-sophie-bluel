const api = "http://localhost:5678/api/";
const cat = "http://localhost:5678/api/categories/" 
//id : 1,name : Objets; 2,Appartements; 3,Hotels & restaurants
const works = "http://localhost:5678/api/works/";
//id(1à11), title, imageUrl, categoryId, userId, category{id, name,Objets}


//Mise à jour de la page si connecté/déconnecté
function isConnected() {
  if (sessionStorage.getItem('connectOK') === 'true') {
    document.getElementById("edition_ban").style.display = "block";
    document.getElementById("editbtn").style.display = "flex";
    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.href = "index.html";
      loginLink.textContent = "logout";
      loginLink.addEventListener('click', function() {sessionStorage.removeItem('connectOK'); 
                                                      sessionStorage.removeItem('token'); 
                                                      sessionStorage.removeItem('userId');
                            document.getElementById("edition_ban").style.display = "none";});
    }
  }
}

function boutonFiltreActif() {
  document.querySelectorAll('#filtre > div').forEach(el => el.classList.remove('active')); // Supprime la classe 'active' partout
  this.classList.add('active'); // Ajouter la classe 'active' à l'élément cliqué
  appelerFonction(this.id); //envoi vers la fonction de tri
}

async function chargerFiltres() {
  // Requête GET categories
  const response = await fetch(cat);
  const categories = await response.json();

  // filtre de la page principale
  const divFiltre = document.getElementById('filtre');
  const tous = document.createElement('div');
  tous.classList.add('active');
  tous.id = 'tous';
  tous.textContent = 'Tous';
  tous.addEventListener('click', boutonFiltreActif);
  divFiltre.appendChild(tous);
  categories.forEach(category => {
    const option = document.createElement('div');
    option.textContent = category.name;
    option.id = category.name.split(' ')[0]; //(1er mot seulement)
    option.addEventListener('click', boutonFiltreActif);
    divFiltre.appendChild(option);
  });
  
  // filtres de la modale
  const selectMenu = document.getElementById('cat-select');
  categories.forEach(category => {
    const opt = document.createElement('option');
    opt.value = category.id; // La valeur de l'option 
    opt.textContent = category.name; // Le texte affiché dans l'option
    selectMenu.appendChild(opt); })
  
}

//Suppression
async function delWorkById(iD) {
    // Requête DELETE works
    const res = await fetch(works + iD, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token')},});
    
      if (res.ok) {
        resetGallery(); //vide la gallerie
        resetMiniGallery(); //vide la gallerie de la modale
        chargerArticles(); //remplit les galleries avec la bdd
        console.log('Élément exterminé!');
      } 
      else {
        alert("Suppression impossible !");
      } 
}

var arts = []; //array pour stocker
async function chargerArticles() {
      // Requête GET works
      const reponse = await fetch(works);
      const articles = await reponse.json();
      const conteneur = document.getElementsByClassName('gallery');
      const cont2 = document.getElementsByClassName('mini-gallery');
      //stockage des infos pour utilisation ultérieure après triage
      arts = [];
      articles.forEach(article => {
      arts.push({id: article.id, categoryId: article.categoryId,imageUrl: article.imageUrl,title: article.title});
        // Creation figure + img gallerie
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;
        // Creation figure + img gallerie modale
        const fig = document.createElement('figure');
        fig.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
        `;
        //Création icone poubelle
        const divTrash = document.createElement('div');
        divTrash.classList.add('divTrash');
        conteneur[0].appendChild(figure);
        cont2[0].appendChild(fig);
        fig.appendChild(divTrash);
        const trash = document.createElement('i');
        trash.className = "fa-solid fa-trash-can";
        trash.id = article.id;
        //Écoute sur l'icone poubelle pour supprimer un article au clic
        trash.addEventListener('click', function() {
            delWorkById(trash.id);
          });
        divTrash.appendChild(trash);
      });
}

//vide la gallerie
function resetGallery() {
  const conteneur = document.querySelector('.gallery');
  while (conteneur.firstChild) {
    conteneur.removeChild(conteneur.firstChild);
  }
}
//vide la gallerie de la modale
function resetMiniGallery() {
  const conteneur = document.querySelector('.mini-gallery');
  while (conteneur.firstChild) {
    conteneur.removeChild(conteneur.firstChild);
  }
}

//fonction activée pour la catégorie objets
function fonction2() {
  const conteneur = document.getElementsByClassName('gallery');
  for (let article of arts) {
    if (article.categoryId == 1) {
      const figure = document.createElement('figure');
      figure.innerHTML = `
      <img src="${article.imageUrl}" alt="Image de ${article.title}">
        <figcaption>${article.title}</figcaption>
      `;
      conteneur[0].appendChild(figure);
    };
  }
}

//fonction activée pour la catégorie Appartements
function fonction3() {
  const conteneur = document.getElementsByClassName('gallery');
  for (let article of arts) {
    if (article.categoryId == 2) {
      const figure = document.createElement('figure');
      figure.innerHTML = `
      <img src="${article.imageUrl}" alt="Image de ${article.title}">
        <figcaption>${article.title}</figcaption>
      `;
      conteneur[0].appendChild(figure);
    };
  }
}

//fonction activée pour la catégorie Hotels
function fonction4() {
  const conteneur = document.getElementsByClassName('gallery');
  for (let article of arts) {
    if (article.categoryId == 3) {
      const figure = document.createElement('figure');
      figure.innerHTML = `
      <img src="${article.imageUrl}" alt="Image de ${article.title}">
        <figcaption>${article.title}</figcaption>
      `;
      conteneur[0].appendChild(figure);
    };
  }
}

//Triage
function appelerFonction(valeur) {
  switch (valeur) {
    case 'tous':
      resetGallery()
      chargerArticles();
      break;
    case 'Objets':
      resetGallery()
      fonction2();
      break;
    case 'Appartements':
      resetGallery()
      fonction3();
      break;
    case 'Hotels':
      resetGallery()
      fonction4();
      break;
    default:
      console.log("Aucune fonction correspondante");
  }
}

  // Appel au chargement de la page
  window.onload = function() {
    isConnected();
    chargerFiltres();
    chargerArticles();
  }