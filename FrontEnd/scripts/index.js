/*const api = "http://localhost:5678/api/";
const cat = "http://localhost:5678/api/categories" 
//id : 1,Objets; 2,Appartements; 3,Hotels & restaurants
const works = "http://localhost:5678/api/works";
//id(1à11), title, imageUrl, categoryId, userId, category{id, name,Objets}

const gallery = fetch(works);
const gall = gall.json();
const sectionGallery = document.querySelector(".gallery");
// Récupération de l'élément du DOM qui accueillera works*/

async function chargerArticles() {
    try {
      // Effectuer la requête GET
      const reponse = await fetch('http://localhost:5678/api/works');
      const articles = await reponse.json();
  
      // Sélectionner l'élément HTML où insérer les articles
      const conteneur = document.getElementsByClassName('gallery');
      if (typeof conteneur == 'undefined') {console.log("conteneur gallery n'existe pas");}
      if (typeof conteneur == 'null') {console.log("conteneur gallery est null");}
      // Parcourir chaque article et créer les éléments HTML
      articles.forEach(article => {
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img src="${article.imageUrl}" alt="Image de ${article.title}">
          <figcaption>${article.title}</figcaption>
        `;
        if (typeof figure == 'undefined') {console.log("figure n'existe pas");}
        if (typeof figure == 'null') {console.log("figure est null");}
        // Insérer l'élément dans la page
        conteneur[0].appendChild(figure);
      });
    } catch (erreur) {
      console.error('Il y a eu un problème avec l\'opération fetch: ' + erreur.message);
    }
  }
  // Appeler la fonction au chargement de la page
  window.onload = chargerArticles;