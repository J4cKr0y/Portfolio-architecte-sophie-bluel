// Ouverture
const modal = document.getElementById("modal-window");
const btn = document.getElementById("editbtn");
btn.addEventListener("click", function() {
  modal.style.display = "flex";
});

// Fermeture X
const clse = document.getElementsByClassName("fa-xmark")[0];
clse.addEventListener("click", function() {
  modal.style.display = "none";
});

// Fermeture clic hors fenêtre
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

//Suppression de travaux existants
/*
document.addEventListener('DOMContentLoaded', (event) => {
  const trashIcons = document.querySelectorAll(".fa-trash-can");
  const trashIcons = document.getElementsByClassName("fa-solid fa-trash-can");
  trashIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      try {
        console.log(icon.id);
        alert(icon.id)
        delWorkById(icon.id);
      } catch (error) {
        console.error('Erreur:', error);
        alert(error);
      }
    });

    icon.addEventListener('mouseenter', function() {
      console.log(icon.id);
    });
  });

  async function delWorkById(iD) {
    try {
      const res = await fetch(works + iD, { method: 'DELETE' });
      const del = await res.json();
      if (res.status !== 200) {
        console.error('Suppression impossible. On ne parle pas de Bruno, no, no, no !');
        alert("Suppression impossible !");
        return;
      }
      console.log('Élément supprimé: ', del, 'Mission accomplished !');
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
}); */
