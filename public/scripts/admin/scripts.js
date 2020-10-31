//menu ativo
const currentPage = location.pathname;
const menuItems = document.querySelectorAll(".header a");
for (const item of menuItems) {
  currentPage.includes(item.getAttribute('href')) ? item.classList.add("active") : '';
}

function readImage() {
  if (this.files && this.files[0]) {
      var file = new FileReader();
      file.onload = function(e) {
          document.getElementById("img-preview").src = e.target.result;
      };       
      file.readAsDataURL(this.files[0]);
  }
}

document.getElementById("avatar").addEventListener("change", readImage, false);