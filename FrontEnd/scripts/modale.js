let previewContainer;

// Ouverture
const modal = document.getElementById("modal-back");
const btn = document.getElementById("editbtn");
btn.addEventListener("click", function () {
  modal.style.display = "flex";
});

// Fermeture X
const clse = [
  document.getElementsByClassName("fa-xmark")[0],
  document.getElementsByClassName("fa-xmark")[1],
];
clse.forEach((item) => {
  item.addEventListener("click", (event) => {
    modal.style.display = "none";
  });
});

// Fermeture clic hors fenêtre
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Fermeture Touche échap
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});

// Changement de fenêtre - passage en mode ajout
const modalAddBtn = document.getElementById("mini-gallery_addbtn");
modalAddBtn.addEventListener("click", function () {
  const mwindow = document.getElementById("modal-window");
  mwindow.style.display = "none";
  const mwindowAdd = document.getElementById("modal-windowAdd");
  mwindowAdd.style.display = "block";
});

// Changement de fenêtre - retour en mode suppression
const modalBackBtn = document.getElementById("modalBackBtn");
modalBackBtn.addEventListener("click", function () {
  const mwindow = document.getElementById("modal-window");
  mwindow.style.display = "block";
  const mwindowAdd = document.getElementById("modal-windowAdd");
  mwindowAdd.style.display = "none";
});

// Preview de l'image chargée
let image;
const fileInput = document.getElementById("filetoUpload");
previewContainer = document.getElementById("preview");

fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    image = fileInput.files[0];
    let imageSize = image.size / 1024 / 1024;
    if (imageSize > 4) {
      alert("Veuillez choisir une photo de moins de 4Mo s'il vous plaît.");
      return;
    }
    const imageUrl = URL.createObjectURL(image);

    let imgPreview = document.createElement("img");
    imgPreview.src = imageUrl;
    imgPreview.alt = "Aperçu de l'image sélectionnée";
    imgPreview.style.width = "auto";
    imgPreview.style.height = "76px";
    imgPreview.style.marginTop = "5%";

    while (previewContainer.firstChild) {
      previewContainer.removeChild(previewContainer.firstChild);
    }
    previewContainer.appendChild(imgPreview);
  }
});

// Efacement de la preview, réinsertion de l'image fontawesone d'origine.
function resetPreview() {
  previewContainer = document.getElementById("preview");
  const baliseI = document.createElement("i");
  baliseI.className = "fa-regular fa-image";
  while (previewContainer.firstChild) {
    previewContainer.removeChild(previewContainer.firstChild);
  }
  previewContainer.appendChild(baliseI);
}

//remise à zero du preview, des formulaires, et des galleries d'image.
function resetAll() {
  resetPreview();
  document.getElementById("modal-windowAdd").reset();
  document.getElementById("mg_validAddBtnOff").style.display = "block";
  document.getElementById("mg_validAddBtn").style.display = "none";
  resetGallery();
  resetMiniGallery();
  chargerArticles();
}

//Bouton pour effacer preview, formulaires, etc.
document.getElementById("reset").addEventListener("click", function () {
  resetAll();
});

// si tous les champs sont remplis, bouton vert
function checkChamps() {
  if (
    fileInput.value &&
    document.getElementById("modalAddTitle").value.trim() &&
    document.getElementById("cat-select").value
  ) {
    document.getElementById("mg_validAddBtnOff").style.display = "none";
    document.getElementById("mg_validAddBtn").style.display = "block";
  } else {
    document.getElementById("mg_validAddBtnOff").style.display = "block";
    document.getElementById("mg_validAddBtn").style.display = "none";
  }
}
document.getElementById("filetoUpload").addEventListener("change", checkChamps);
document
  .getElementById("modalAddTitle")
  .addEventListener("change", checkChamps);
document.getElementById("cat-select").addEventListener("change", checkChamps);

// Envoi de l'image et de toutes les données connexes
document
  .getElementById("mg_validAddBtn")
  .addEventListener("click", async function () {
    //Vérifie si tous les champs sont remplis
    if (!image) {
      alert("Veuillez ajouter une photo s'il vous plaît.");
      return;
    }
    const title = document.getElementById("modalAddTitle").value;
    if (!title.trim()) {
      alert("Veuillez sélectionner un titre s'il vous plaît.");
      return;
    }
    let categorySelect = document.getElementById("cat-select");
    let selectedOption = categorySelect.selectedOptions[0];
    let category = selectedOption ? selectedOption.value : "";
    if (!category) {
      alert("Veuillez sélectionner une catégorie s'il vous plaît.");
      return;
    }

    /****  Requête POST works  ****/
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
    const upload = await fetch(works, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    });

    if (upload.status != 201) {
      alert("Erreur.");
      return;
    }
    if (upload.status == 201) {
      resetAll();
      modalBackBtn.click();
    }
  });

/* Blocage des actions par défaut du drag */
function dragOverHandler(ev) {
  ev.preventDefault();
}

/* événement drop */
function dropHandler(ev) {
  ev.preventDefault();

  const file = ev.dataTransfer.files[0];
  if (file) {
    let dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;
    const changeEvent = new Event("change");
    fileInput.dispatchEvent(changeEvent);
  }
}

/* Écouteurs d'événements */
previewContainer.addEventListener("dragover", dragOverHandler);
previewContainer.addEventListener("drop", dropHandler);

function submitByEnter(event, button) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
}

window.addEventListener("keydown", function (event) {
  submitByEnter(event, document.getElementById("mg_validAddBtn"));
});
