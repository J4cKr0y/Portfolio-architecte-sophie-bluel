// Ouverture
const modal = document.getElementById("modal-back");
const btn = document.getElementById("editbtn");
btn.addEventListener("click", function() {
  modal.style.display = "flex";
});

// Fermeture X
const clse = [document.getElementsByClassName("fa-xmark")[0], document.getElementsByClassName("fa-xmark")[1]];
clse.forEach(item => {item.addEventListener('click', event => {modal.style.display = "none";})})

// Fermeture clic hors fenêtre
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Fermeture Touche échap
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    modal.style.display = "none";
  }
});

// Changement de fenêtre - passage en mode ajout
const modalAddBtn = document.getElementById("mini-gallery_addbtn");
modalAddBtn.addEventListener("click", function() {
  console.log("Mode Ajout sélectionné");
  try {
    const mwindow = document.getElementById('modal-window');
    mwindow.style.display = "none";
    const mwindowAdd = document.getElementById('modal-windowAdd');
    mwindowAdd.style.display = "block";
  } catch (error) {
    console.error('Erreur:', error);
  }
});

// Changement de fenêtre - retour en mode suppression
const modalBackBtn = document.getElementById("modalBackBtn");
modalBackBtn.addEventListener("click", function() {
  console.log("Mode Suppression sélectionné");
  try {
    const mwindow = document.getElementById('modal-window');
    mwindow.style.display = "block";
    const mwindowAdd = document.getElementById('modal-windowAdd');
    mwindowAdd.style.display = "none";
  } catch (error) {
    console.error('Erreur:', error);
  }
});


// Preview de l'image chargée
let image; 
const fileInput = document.getElementById('filetoUpload');
const previewContainer = document.getElementById('preview');
fileInput.addEventListener('change', function() {
  if (fileInput.files.length > 0) {
    image = fileInput.files[0]; 
    const imageUrl = URL.createObjectURL(image);

    let imgPreview = document.createElement('img');
    imgPreview.src = imageUrl;
    imgPreview.alt = 'Aperçu de l\'image sélectionnée';
    imgPreview.style.width = 'auto'; 
    imgPreview.style.height = '76px';
    imgPreview.style.marginTop = '5%';
    if (previewContainer.tagName.toLowerCase() === 'I') {
      previewContainer.parentNode.replaceChild(imgPreview, previewContainer);
    } else {
      previewContainer.src = imageUrl;
    }
  }
});

// Envoi de l'image et de toutes les données connexes
document.getElementById("mg_validAddBtn").addEventListener("click", function() {
  if (!image) {
    alert("Veuillez ajouter une photo s'il vous plaît.");
    return;
  }

  const title = document.getElementById("modalAddTitle").value;
  if (!title) {
    alert("Veuillez sélectionner un titre s'il vous plaît.");
    return;
  }

  let categorySelect = document.getElementById("cat-select");
  let selectedOption = categorySelect.selectedOptions[0];
  let category = selectedOption ? selectedOption.value : '';

  console.log("category : "+ category);
  if (!category) {
    alert("Veuillez sélectionner une catégorie s'il vous plaît.");
    return;
  }

  const formData = new FormData();
  formData.append("image", image); 
  formData.append("title", title);
  formData.append("category", category); 
  console.log("formData : "+  toString.formData);
  fetch(works, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem('token'),
    },
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Réponse réseau non ok.');
    }
    return response.headers.get('content-type').includes('application/json') ? response.json() : response.text();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));
});