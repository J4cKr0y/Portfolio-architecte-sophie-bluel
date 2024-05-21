const api = "http://localhost:5678/api/";
const cat = "http://localhost:5678/api/categories" 
//id : 1,name : Objets; 2,Appartements; 3,Hotels & restaurants
const works = "http://localhost:5678/api/works";
//id(1à11), title, imageUrl, categoryId, userId, category{id, name,Objets}


function testifnull(truc) {
  if (typeof truc == 'undefined') {console.log(truc  +" n'existe pas");}
  if (typeof truc == 'null') {console.log(truc  +" est null");}
}

async function chargerMenu() {
  // Effectuer la requête GET
  const response = await fetch(cat);
  const categories = await response.json();
  const divFiltre = document.getElementById('filtre');
  // Parcourez les catégories et ajoutez-les au menu
  const tous = document.createElement('div');
  tous.id = 'tous';
  tous.textContent = 'Tous';
  tous.onclick = function() {appelerFonction(this.id);};
  divFiltre.appendChild(tous);
  categories.forEach(category => {
    const option = document.createElement('div');
    option.textContent = category.name;
    option.id = category.name.split(' ')[0]; // La valeur de l'option (1er mot seulement)
    option.onclick = function() {appelerFonction(this.id);};
    divFiltre.appendChild(option);
  });
}

let arts = []; //array
async function chargerArticles() {
    try {
      const reponse = await fetch(works);
      const articles = await reponse.json();
      const conteneur = document.getElementsByClassName('gallery');
      arts = [];
      articles.forEach(article => {
        arts.push({categoryId: article.categoryId,imageUrl: article.imageUrl,title: article.title});
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;
        conteneur[0].appendChild(figure);
      });
    } catch (erreur) {
      console.error('Il y a eu un problème avec l\'opération fetch: ' + erreur.message);
    }
}
function removeGallery() {
  var conteneur = document.querySelector('.gallery');
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
      removeGallery()
      chargerArticles();
      break;
    case 'Objets':
      removeGallery()
      fonction2();
      break;
    case 'Appartements':
      removeGallery()
      fonction3();
      break;
    case 'Hotels':
      removeGallery()
      fonction4();
      break;
    default:
      console.log("Aucune fonction correspondante");
  }
}



  // Appeler les fonctions au chargement de la page
  window.onload = function() {
    chargerMenu();
    chargerArticles();
  }