function addIngredient() {
  const ingredients = document.querySelector('#ingredients');
  const field = document.querySelectorAll('.ingredient');

  const newField = field[field.length - 1].cloneNode(true);

  if (newField.children[0].value == '') return false;

  newField.children[0].value = '';
  ingredients.appendChild(newField);
}

function addPreparation() {
  const steps = document.querySelector('#steps');
  const field = document.querySelectorAll('.step');

  const newField = field[field.length - 1].cloneNode(true);

  if (newField.children[0].value == '') return false;

  newField.children[0].value = '';
  steps.appendChild(newField);
}

document.querySelector(".add-ingredient").addEventListener("click", function (e) {
  e.preventDefault();
  addIngredient();
});

document.querySelector(".add-step").addEventListener("click", function (e) {
  e.preventDefault();
  addPreparation();
});
