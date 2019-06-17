'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Блок setup и его элементы
var setupBlock = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupBlock.querySelector('.setup-close');
var userNameInput = setupBlock.querySelector('.setup-user-name');

function popupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupPopup();
  }
}

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
setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupPopup();
  }
});

// обработчик на клик и на нажатие enter по элементу setupCloseElement
setupCloseElement.addEventListener('click', closeSetupPopup);
setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupPopup();
  }
});

// Если фокус находится на форме ввода имени, то окно закрываться не должно:
userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', popupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', popupEscPress);
});

// валидация формы
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
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

// изменяем мага
var setupWizard = setupBlock.querySelector('.setup-player');

function setWizardElementColor(element, colors) {
  element.style.fill = colors[getRandomInt(0, colors.length)];
}

// меняем цвет мантии
var wizardCoat = setupWizard.querySelector('.wizard-coat');

var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

wizardCoat.addEventListener('click', function () {
  setWizardElementColor(wizardCoat, wizardCoatColors);
});

wizardCoat.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setWizardElementColor(wizardCoat, wizardCoatColors);
  }
});

// меняем цвет глаз
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

wizardEyes.addEventListener('click', function () {
  setWizardElementColor(wizardEyes, wizardEyesColors);
});

wizardEyes.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setWizardElementColor(wizardEyes, wizardEyesColors);
  }
});

// меняем цвет фаербола
var fireBall = setupWizard.querySelector('.setup-fireball-wrap');
var fireBallColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

fireBall.addEventListener('click', function () {
  fireBall.style.backgroundColor = fireBallColors[getRandomInt(0, fireBallColors.length)];
});

fireBall.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    fireBall.style.backgroundColor = fireBallColors[getRandomInt(0, fireBallColors.length)];
  }
});
