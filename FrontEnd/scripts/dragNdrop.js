/* Zone du drag & drop et input à alimenter déjà déclarés dans modale.js 
//const previewContainer = document.getElementById('preview'); 
//const fileInput = document.getElementById('filetoUpload'); */

/* Blocage des actions par défaut du drag */
function dragOverHandler(ev) {
  ev.preventDefault();
}

/* événement drop */
function dropHandler(ev) {
  ev.preventDefault();

  const file = ev.dataTransfer.files[0]; // Prend le (premier) fichier
  if (file) {
      let dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files; // Transfert dans l'input
      const changeEvent = new Event('change');
      fileInput.dispatchEvent(changeEvent); // Lance l'événement 'change'
  }
}

/* Écouteurs d'événements */
previewContainer.addEventListener('dragover', dragOverHandler);
previewContainer.addEventListener('drop', dropHandler);
