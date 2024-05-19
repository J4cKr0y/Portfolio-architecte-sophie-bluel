const api = "http://localhost:5678/api/";
const cat = "http://localhost:5678/api/categories" 
//id : 1,name : Objets; 2,Appartements; 3,Hotels & restaurants
const works = "http://localhost:5678/api/works";
//id(1à11), title, imageUrl, categoryId, userId, category{id, name,Objets}

function testifnull(truc) {
  if (typeof truc == 'undefined') {console.log(truc  +" n'existe pas");}
      if (typeof truc == 'null') {console.log(truc  +" est null");}
}

async function chargerArticles() {
    try {
      // Effectuer la requête GET
      const reponse = await fetch(works);
      const articles = await reponse.json();
  
      // Sélectionner l'élément HTML où insérer les articles
      var conteneur = document.getElementsByClassName('gallery');
      testifnull(conteneur);
      // Parcourir chaque article et créer les éléments HTML
      articles.forEach(article => {
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;
        testifnull(figure);
        // Insérer l'élément dans la page
        conteneur[0].appendChild(figure);
      });
    } catch (erreur) {
      console.error('Il y a eu un problème avec l\'opération fetch: ' + erreur.message);
    }
  }

  async function chargerMenu() {
    // Supposons que vous ayez un ensemble de catégories
    const response = await fetch(cat);
    const categories = await response.json();
  
    // Créez un élément <select>
    const selectMenu = document.createElement('select');
    // Parcourez les catégories et ajoutez-les au menu
    const option = document.createElement('option');
    option.value = "tous"; 
    option.textContent = "Tous les projets"; 
    selectMenu.appendChild(option);
    
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.name; // La valeur de l'option (peut être l'ID ou autre)
      option.textContent = category.name; // Le texte affiché dans l'option
      selectMenu.appendChild(option);
    });

    // Ajoutez le menu au DOM (par exemple, à un élément avec l'ID 'filtre')
    const menuContainer = document.getElementById('filtre');
    menuContainer.appendChild(selectMenu);
  } 


  // Appeler la fonction au chargement de la page
  window.onload = function() {
    chargerMenu();
    chargerArticles();
  }

 