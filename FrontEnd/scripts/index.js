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
  // Créez un élément <select>
  var selectMenu = document.createElement('select');
  selectMenu.id = 'monSelecteur';
  selectMenu.onchange = function() {appelerFonction(this.value);};
  // Parcourez les catégories et ajoutez-les au menu
  const option = document.createElement('option');
  option.value = "Tous"; 
  option.textContent = "Tous les projets"; 
  selectMenu.appendChild(option);
  selectMenu.value = 'selectedValue';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name; // La valeur de l'option 
    option.textContent = category.name; // Le texte affiché dans l'option
    selectMenu.appendChild(option);
  });
  // Ajoutez le menu au DOM (par exemple, à un élément avec l'ID 'filtre')
  const menuContainer = document.getElementById('filtre');
  menuContainer.appendChild(selectMenu);
} 
const artSet = new Set();
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
    case 'Tous':
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
    case 'Hotels & restaurants':
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


/*async function chargerArticles() {
    try {
      // Effectuer la requête GET
      const reponse = await fetch(works);
      const articles = await reponse.json();
      // Sélectionner l'élément HTML où insérer les articles
      var conteneur = document.getElementsByClassName('gallery');
      // Parcourir chaque article et créer les éléments HTML
      var artSet = new Set();
      articles.forEach(article => {
        var artId = article.categoryId;
        artSet.add(artId);
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;
        // Insérer l'élément dans la page
        conteneur[0].appendChild(figure);
      });
    } catch (erreur) {
      console.error('Il y a eu un problème avec l\'opération fetch: ' + erreur.message);
    }
  }

  async function chargerMenu() {
    // Effectuer la requête GET
    const response = await fetch(cat);
    const categories = await response.json();
  
    // Créez un élément <select>
    var selectMenu = document.createElement('select');
    var monSelecteur = selectMenu.id
    selectMenu.onchange = function() {appelerFonction(this.value);};
    console.log(monSelecteur);
    // Parcourez les catégories et ajoutez-les au menu
    const option = document.createElement('option');
    option.value = "Tous"; 
    option.textContent = "Tous les projets"; 
    selectMenu.appendChild(option);
    var selectedValue = selectMenu.value;
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.name; // La valeur de l'option 
      option.textContent = category.name; // Le texte affiché dans l'option
      selectMenu.appendChild(option);
    });

    // Ajoutez le menu au DOM (par exemple, à un élément avec l'ID 'filtre')
    const menuContainer = document.getElementById('filtre');
    menuContainer.appendChild(selectMenu);
  } 

function fonction2() {
  for (let item of artSet) {
    console.log(item);
    if (item == 1) {
      const figure = document.createElement('figure');
      figure.innerHTML = `
      <img src="${article.imageUrl}" alt="Image de ${article.title}">
        <figcaption>${article.title}</figcaption>
      `;
      // Insérer l'élément dans la page
      conteneur[0].appendChild(figure);
    };
    }
  }

function fonction3() {
  console.log("Appartements appelée");
}
function fonction4() {
  console.log("Hotels & restaurants appelée");
}

function appelerFonction(valeur) {
  switch (valeur) {
    case 'Tous':
      chargerArticles();
      break;
    case 'Objets':
      fonction2();
      break;
    case 'Appartements':
      fonction3();
      break;
    case 'Hotels & restaurants':
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
*/
 