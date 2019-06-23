'use strict';
(function () {
// блок для вставки похожих магов
  var similarListElement = document.querySelector('.setup-similar-list');
  // шаблон с магом
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

    /*
  // Создаёт массив из объектов со свойствами персонажей
  function createWizardsArr(names, lastNames, coatColors, eyesColors, number) {
    var wizards = [];
    for (var i = 0; i < number; i++) {
      var wizard = {};
      wizard.name = names[window.util.getRandomInt(0, names.length)] + ' ' + lastNames[window.util.getRandomInt(0, lastNames.length)];
      wizard.coatColor = coatColors[window.util.getRandomInt(0, coatColors.length)];
      wizard.eyesColor = eyesColors[window.util.getRandomInt(0, eyesColors.length)];
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
   */


  // ф-ия для создания мага из шаблона по свойствам
  function renderWizard(wizard, template) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }
  // создаёт фрагмент с магами
  function getWizardsFragment(wizards, quantity, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderWizard(wizards[window.util.getRandomInt(0, wizards.length)], template));
    }
    return fragment;
  }

  function successHandler(wizardsData) {
    // вставка фрагмента в DOM
    similarListElement.appendChild(getWizardsFragment(wizardsData, 4, similarWizardTemplate));
    // показываем блок setup-similar
    document.querySelector('.setup-similar').classList.remove('hidden');
  }

  function errorHandler(errorMessage) {
    var divNode = document.createElement('div');
    var spanNode = document.createElement('span');
    divNode.style = 'position: absolute; top: 50%; z-index: 100; height: 60px; margin: 0 auto; display: flex; background-color: red; ';
    divNode.style.left = 0;
    divNode.style.right = 0;
    spanNode.textContent = errorMessage;
    spanNode.style = 'margin: auto; font-size: 40px;';
    divNode.appendChild(spanNode);
    document.body.insertAdjacentElement('afterbegin', divNode);
  }

  /*   // вставка фрагмента в DOM
  similarListElement.appendChild(getWizardsFragment(wizardsArr, similarWizardTemplate));
  // показываем блок setup-similar
  document.querySelector('.setup-similar').classList.remove('hidden'); */

  window.backend.load(successHandler, errorHandler);
})();
