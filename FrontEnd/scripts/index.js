const api = "http://localhost:5678/api/";
const cat = "http://localhost:5678/api/categories" 
//id : 1,name : Objets; 2,Appartements; 3,Hotels & restaurants
const works = "http://localhost:5678/api/works";
//id(1à11), title, imageUrl, categoryId, userId, category{id, name,Objets}


function testifnull(truc) {
  if (typeof truc == 'undefined') {console.log(truc  +" n'existe pas");}
  if (typeof truc == 'null') {console.log(truc  +" est null");}
}

function isConnected() {
  if (sessionStorage.getItem('connectOK') === 'true') {
    document.getElementById("editbtn").style.display = "flex";
    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.href = "index.html";
      loginLink.textContent = "logout";
      loginLink.addEventListener('click', function() {sessionStorage.removeItem('connectOK');});
    }
  }
}

function boutonFiltreActif() {
  document.querySelectorAll('#filtre > div').forEach(el => el.classList.remove('active')); // Supprime la classe 'active' partout
  this.classList.add('active'); // Ajouter la classe 'active' à l'élément cliqué
  appelerFonction(this.id); //envoi vers la fonction de tri
}

async function chargerFiltres() {
  // Effectuer la requête GET
  const response = await fetch(cat);
  const categories = await response.json();
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
}

var arts = []; //array
async function chargerArticles() {
    try {
      const reponse = await fetch(works);
      const articles = await reponse.json();
      const conteneur = document.getElementsByClassName('gallery');
      const cont2 = document.getElementsByClassName('mini-gallery');
      arts = [];
      articles.forEach(article => {
        arts.push({categoryId: article.categoryId,imageUrl: article.imageUrl,title: article.title});
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;
        const fig = document.createElement('figure');
        fig.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
        `;
        const divTrash = document.createElement('div');
        divTrash.classList.add('divTrash');
        conteneur[0].appendChild(figure);
        cont2[0].appendChild(fig);
        fig.appendChild(divTrash);
        const trash = document.createElement('i');
        trash.className = "fa-solid fa-trash-can";
        divTrash.appendChild(trash);
      });
    } catch (erreur) {
      console.error('Il y a eu un problème avec l\'opération fetch: ' + erreur.message);
    }
}
function resetGallery() {
  const conteneur = document.querySelector('.gallery');
  while (conteneur.firstChild) {
    conteneur.removeChild(conteneur.firstChild);
  }
}

function fonction2() {
  const conteneur = document.getElementsByClassName('gallery');
  for (let article of arts) {
    console.log(article);
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
function fonction3() {
  const conteneur = document.getElementsByClassName('gallery');
  for (let article of arts) {
    console.log(article);
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
function fonction4() {
  const conteneur = document.getElementsByClassName('gallery');
  for (let article of arts) {
    console.log(article);
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



  // Appeler les fonctions au chargement de la page
  window.onload = function() {
    isConnected();
    chargerFiltres();
    chargerArticles();
  }