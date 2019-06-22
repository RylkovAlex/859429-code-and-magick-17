'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var setupBlock = document.querySelector('.setup');
  var setupWizard = setupBlock.querySelector('.setup-player');
  function setElementColor(element, colors) {
    var color = colors[window.util.getRandomInt(0, colors.length)];
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
  }
  // меняем цвет мантии по клику или enter
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
    setElementColor(wizardCoat, wizardCoatColors);
  });
  wizardCoat.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, wizardCoatColors);
  });
  // меняем цвет глаз по клику или enter
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardEyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  wizardEyes.addEventListener('click', function () {
    setElementColor(wizardEyes, wizardEyesColors);
  });
  wizardEyes.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      setElementColor(wizardEyes, wizardEyesColors);
    }
  });
  // меняем цвет фаербола по клику или enter
  var fireBall = setupWizard.querySelector('.setup-fireball-wrap');
  var fireBallColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  fireBall.addEventListener('click', function () {
    setElementColor(fireBall, fireBallColors);
  });
  fireBall.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      fireBall.style.backgroundColor = fireBallColors[window.util.getRandomInt(0, fireBallColors.length)];
    }
  });
})();