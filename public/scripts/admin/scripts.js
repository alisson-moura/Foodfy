//menu ativo
const currentPage = location.pathname;
const menuItems = document.querySelectorAll(".header a");
for (const item of menuItems) {
  currentPage.includes(item.getAttribute('href')) ? item.classList.add("active") : '';
}