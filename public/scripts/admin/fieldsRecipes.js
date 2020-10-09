function addIngredient() {
  const ingredients = document.querySelector('#ingredients');
  let field = document.querySelectorAll('.ingredient');
  if (field.length == 0) {
    let content = `<div class="ingredient">
                    <input type="text" name="ingredients[]" value=""/>
                  </div>`;
    ingredients.innerHTML += content;
  }
  field = document.querySelectorAll('.ingredient');
  const newField = field[field.length - 1].cloneNode(true);

  if (newField.children[0].value == '') return false;

  newField.children[0].value = '';
  ingredients.appendChild(newField);
}

function addPreparation() {
  const steps = document.querySelector('#steps');
  let field = document.querySelectorAll('.step');

  if (field.length == 0) {
    let content = `<div class="step">
                    <input type="text" name="preparation[]" value=""/>
                  </div>`;
    steps.innerHTML += content;
  }
  field = document.querySelectorAll('.step');

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
