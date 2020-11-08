const details = document.querySelectorAll('.detail-content');

for (let detail of details) {
  detail.querySelector('.spanBtn').addEventListener('click', function () {
    if (detail.classList.contains('active')) {
      show(detail);
    }
    else {
      hide(detail)
    }
  });
}

function show(element) {
  element.classList.remove('active');
  element.querySelector('.spanBtn').innerHTML = "ESCONDER"
}

function hide(element) {
  element.classList.add('active');
  element.querySelector('.spanBtn').innerHTML = "MOSTRAR"
}

//menu ativo
const currentPage = location.pathname;
const menuItems = document.querySelectorAll(".links a");
for (const item of menuItems) {
  currentPage.includes(item.getAttribute('href')) ? item.classList.add("active") : '';
}

const SelectImageBanner = {
  banner: document.querySelector('.image-banner'),
  images:  document.querySelectorAll('.image-miniature'),
  handleSelectImage(event) {
    let imageSelected = event.target;
    for (const image of this.images) {
      image.src == imageSelected.src ? image.style.opacity = 0.7 : image.style.opacity = 1
    }
  
    SelectImageBanner.banner.src = event.target.src
  }
}