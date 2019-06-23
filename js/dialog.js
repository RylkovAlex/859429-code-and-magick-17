'use strict';
(function () {
  // Блок setup и его элементы
  var setupBlock = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupBlock.querySelector('.setup-close');
  var userNameInput = setupBlock.querySelector('.setup-user-name');
  var setupDefaultY;
  var setupDefaultX;
  var form = setupBlock.querySelector('.setup-wizard-form');
  var submitButton = form.querySelector('.setup-submit');

  function FormSuccessHandler() {
    setupBlock.classList.add('hidden');
    submitButton.disabled = false;
    var divNode = document.createElement('div');
    var spanNode = document.createElement('span');
    divNode.style = 'position: absolute; top: 50%; z-index: 100; height: 100px; margin: 0 auto; display: flex; background-color: green; ';
    divNode.style.left = 0;
    divNode.style.right = 0;
    spanNode.textContent = 'Данные отправлены!';
    spanNode.style = 'margin: auto; font-size: 40px;';
    divNode.appendChild(spanNode);
    document.body.insertAdjacentElement('afterbegin', divNode);
    setTimeout(function () {
      divNode.remove();
    }, 500);
  }

  function FormErrorHandler(errorMessage) {
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    submitButton.disabled = true;
    window.backend.save(new FormData(form), FormSuccessHandler, FormErrorHandler);
  });

  // закрытие диалога по Esc
  function popupEscPress(evt) {
    window.util.isEscEvent(evt, closeSetupPopup);
  }
  // открытие диалога
  function openSetupPopup() {
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPress);
    setupDefaultY = setupBlock.offsetTop;
    setupDefaultX = setupBlock.offsetLeft;
  }
  // закрытие диалога
  function closeSetupPopup() {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPress);
    setDefaultPosition();
  }
  // обработчик на клик и на нажатие enter по элементу setupOpenElement
  setupOpenElement.addEventListener('click', openSetupPopup);
  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetupPopup);
  });
  // обработчик на клик и на нажатие enter по элементу setupCloseElement
  setupCloseElement.addEventListener('click', closeSetupPopup);
  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeSetupPopup);
  });

  // Если фокус находится на форме ввода имени, то окно закрываться не должно:
  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', popupEscPress);
  });
  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', popupEscPress);
  });

  // Перетаскивание диалогового окна
  var dialogHandle = setupBlock.querySelector('.upload');

  function setDefaultPosition() {
    setupBlock.style.top = setupDefaultY + 'px';
    setupBlock.style.left = setupDefaultX + 'px';
  }

  function onDialogHandlerClick(evt) {
    evt.preventDefault();
    var element = setupBlock;
    var handleElement = dialogHandle;
    moveElement(evt, element, handleElement);
  }

  function moveElement(evt, element, handleElement) {
    element.style.position = 'absolute';
    // текущие координаты
    var Coords = {
      x: evt.clientX,
      y: evt.clientY
    };
      // флаг для отслеживания было ли перемещения окна
    var dragged = false;

    // обрабатывает перемещение и меняет позицию окна
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: Coords.x - moveEvt.clientX,
        y: Coords.y - moveEvt.clientY
      };

      Coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      element.style.top = (element.offsetTop - shift.y) + 'px';
      element.style.left = (element.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // отмена действий по умолчанию на клик
      function onClickPreventDefault(clickEvt) {
        clickEvt.preventDefault();
        handleElement.removeEventListener('click', onClickPreventDefault);
      }

      if (dragged) {
        handleElement.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  dialogHandle.addEventListener('mousedown', onDialogHandlerClick);

  // перетаскивания предметов из магазина в рюкзак.
  var shop = document.querySelector('.setup-artifacts-shop');
  var bag = document.querySelector('.setup-artifacts');

  function starMoveHandler(evt) {
    var bagCells = bag.querySelectorAll('.setup-artifacts-cell');
    var bagFreeCell = window.util.getElWithoutChilds(bagCells);
    var shopCells = shop.querySelectorAll('.setup-artifacts-cell');
    var shopFreeCell = window.util.getElWithoutChilds(shopCells);

    var bagCoords = window.util.getCoords(bag);
    var item = evt.target;
    var itemDefault = {
      x: item.style.left,
      y: item.style.top
    };

    if (item.tagName.toLowerCase() === 'img') {
      moveElement(evt, item, item);
    }
    // TODO: исправить баг с перемещением "shop to shop" и "bag to bag"
    document.addEventListener('mouseup', function (mouseupEvt) {
      if (mouseupEvt.clientX > bagCoords.left && mouseupEvt.clientX < bagCoords.right && mouseupEvt.clientY > bagCoords.top && mouseupEvt.clientY < bagCoords.bottom) {
        bagFreeCell.appendChild(item);
      } else {
        shopFreeCell.appendChild(item);
      }
      item.style.left = itemDefault.x;
      item.style.top = itemDefault.y;
    });
  }

  shop.addEventListener('mousedown', starMoveHandler, false);
  bag.addEventListener('mousedown', starMoveHandler, false);

})();
