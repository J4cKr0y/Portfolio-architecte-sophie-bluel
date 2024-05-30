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
