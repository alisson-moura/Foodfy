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