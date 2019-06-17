'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// показ/скрытие блока setup
var setupBlock = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupBlock.querySelector('.setup-close');

function popupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupPopup();
  }
};

function openSetupPopup() {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPress);
}

function closeSetupPopup() {
  setupBlock.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPress);
}

// обработчик на клик и на нажатие enter по элементу setupOpenElement
setupOpenElement.addEventListener('click', openSetupPopup);
setupOpenElement.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupPopup();
  }
});

// обработчик на клик и на нажатие enter по элементу setupCloseElement
setupCloseElement.addEventListener('click', closeSetupPopup);
setupCloseElement.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupPopup();
  }
});

// блок для вставки похожих магов
var similarListElement = setupBlock.querySelector('.setup-similar-list');
// шаблон с магом
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Возвращает случайное целое число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Создаёт массив из объектов со свойствами персонажей
function createWizardsArr(names, lastNames, coatColors, eyesColors, number) {
  var wizards = [];
  for (var i = 0; i < number; i++) {
    var wizard = {};
    wizard.name = names[getRandomInt(0, names.length)] + ' ' + lastNames[getRandomInt(0, lastNames.length)];
    wizard.coatColor = coatColors[getRandomInt(0, coatColors.length)];
    wizard.eyesColor = eyesColors[getRandomInt(0, eyesColors.length)];
    wizards.push(wizard);
  }
  return wizards;
}

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// создаём массив с магами
var wizardsArr = createWizardsArr(names, lastNames, coatColors, eyesColors, 4);

// ф-ия для создания мага из шаблона по свойствам
function renderWizard(wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

// создаёт фрагмент с магами
function getWizardsFragment(wizards, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], template));
  }

  return fragment;
}

// вставка фрагмента в DOM
similarListElement.appendChild(getWizardsFragment(wizardsArr, similarWizardTemplate));

// показываем блок setup-similar
document.querySelector('.setup-similar').classList.remove('hidden');
