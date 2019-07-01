'use strict';
(function () {
// блок для вставки похожих магов
  var similarListElement = document.querySelector('.setup-similar-list');
  // шаблон с магом
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  window.backend.load(successHandler, errorHandler);

  // ф-ия для создания мага из шаблона по свойствам
  function renderWizard(wizard, template) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }
  // создаёт фрагмент с магами
  function getWizardsFragment(wizards, quantity, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderWizard(wizards[i], template));
    }
    return fragment;
  }

  function successHandler(wizardsData) {
    window.wizardsData = wizardsData;
    updateWizards();
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

  //
  function getRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.wizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.wizard.eyesColor) {
      rank += 1;
    }
    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updateWizards() {
    var sortedWizardData = window.wizardsData.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    window.updateWizards = updateWizards;
    similarListElement.innerHTML = '';
    // вставка фрагмента в DOM
    similarListElement.appendChild(getWizardsFragment(sortedWizardData, 4, similarWizardTemplate));
    // показываем блок setup-similar
    document.querySelector('.setup-similar').classList.remove('hidden');
  }

})();
