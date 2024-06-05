/* Zone du drag & drop */
let dropbox=document.getElementById("divAddImgBox"); 
/* Évents */
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
/* Blocage des actions par défaut */
function dragenter(e) { e.stopPropagation(); e.preventDefault(); }
function dragover(e) { e.stopPropagation(); e.preventDefault(); }
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  for file  (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith("image/")) {
      continue;
    }
    const preview = getElementById("preview");
    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); 

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
const works = "http://localhost:5678/api/works/";
function uploadFile(file) {
  let formData = new FormData();
  formData.append('file', file);
   console.log("upload en cours...");
}




/* Gestion du clic */
/*depose.addEventListener("click", function(evt) {
  evt.preventDefault();
  document.getElementById("filetoUpload").click();
});*/

/* Gestion du DRAG AND DROP */
/*depose.addEventListener("dragover", function(evt) {
  evt.preventDefault(); 
});*/

/* depose.addEventListener("dragenter", function(evt) {
  this.className="onDropZone"; // Passe en surbrillance 
});

depose.addEventListener("dragleave", function(evt) {
  this.className=""; // La surbrillance s'efface 
}); */

/* Tranfert de la liste des fichiers du drag and drop dans input file */
/* depose.addEventListener("drop", function(evt) {
  evt.preventDefault();
  document.getElementById("filetoUpload").files=evt.dataTransfer.files; 
  //this.className=""; // Surbrillance supprimée 
}); */

/* document.getElementById("filetoUpload").addEventListener("change", function(evt){
  const p=document.getElementById("preview"); // Bloc d'affichage de la liste des fichiers 
  p.innerHTML=""; // Effacer le contenu initial de #preview 
  for (const i=0; i<this.files.length; i++) {
    const f=this.files[i];
    const div=document.createElement("div");
    div.className="fichier";
    const span=document.createElement("span");
    span.innerHTML=f.name+" ("+getHumanSize(f.size)+")";
    const vignette=document.createElement("img");
    vignette.src = window.URL.createObjectURL(f); */

    /* Attacher les élements HTML au DOM */
  /*  div.appendChild(vignette);
    div.appendChild(span);
    p.appendChild(div);
  }
  p.style.display="block";  
}); */

/* Retourne une taille de fichier en mode lisible par un humain */
function getHumanSize(s) {
  s=parseInt(s); // Pour s'assurer que le paramètre d'entrée est entier
  if (s<1024) {
    return s+" o";  
  } else if (s<1024*1024) {
    return (s/1024).toFixed(1)+" ko";  
  } else if (s<1024*1024*1024) {
    return (s/1024/1024).toFixed(1)+" Mo";  
  } else {
    return (s/1024/1024/1024).toFixed(1)+" Go";  
  }
}