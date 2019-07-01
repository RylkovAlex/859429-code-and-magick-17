'use strict';
(function () {
  var setupBlock = document.querySelector('.setup');
  var setupWizard = setupBlock.querySelector('.setup-player');
  window.wizard = {};

  // мантия
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  window.wizard.coatColor = wizardCoat.style.fill;
  var wizardCoatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  // глаза
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  window.wizard.eyesColor = 'black';
  var wizardEyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  // фаербол
  var fireBall = setupWizard.querySelector('.setup-fireball-wrap');
  window.wizard.fireBallColor = getComputedStyle(fireBall).backgroundColor;
  var fireBallColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  // обработчики:
  setupWizard.addEventListener('click', changeWizardColors);
  setupWizard.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, changeWizardColors);
  });

  // вспомогательные функции:
  function setElementColor(element, colors, inputName) {
    var input = document.querySelector('[name=\"' + inputName + '\"]');
    var color = colors[window.util.getRandomInt(0, colors.length)];
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
      input.value = color;
    } else {
      element.style.fill = color;
      input.value = color;
    }
    return color;
  }

  function changeWizardColors(evt) {
    if (evt.target === wizardCoat) {
      window.wizard.coatColor = setElementColor(wizardCoat, wizardCoatColors, 'coat-color');
    } else if (evt.target === wizardEyes) {
      window.wizard.eyesColor = setElementColor(wizardEyes, wizardEyesColors, 'eyes-color');
    } else if (evt.target === fireBall || document.querySelector('.setup-fireball')) {
      window.wizard.fireBallColor = setElementColor(fireBall, fireBallColors, 'fireball-color');
    }
    window.debounce(function () {
      window.updateWizards();
    })();
  }

})();
