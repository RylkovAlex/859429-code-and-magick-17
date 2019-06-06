'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TITLE_INDENT_X = 30;
var TITLE_INDENT_Y = 30;
var FONT_SIZE = 16;
var GAP = 10;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_INTERVAL = 50;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  if (arr.length === 0) { // проверка на пустой массив
    return 'Ошибка: массив пуст!';
  }
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (isNaN(arr[i])) { // проверка элемента на число
      return 'Элемент массива \'' + arr[i] + '\' не является числом! \nВ массиве присутствуют не только числа!';
    }
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = 'bold ' + FONT_SIZE + 'px' + ' PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TITLE_INDENT_X, CLOUD_Y + TITLE_INDENT_Y, CLOUD_WIDTH - 2 * TITLE_INDENT_X);
  ctx.fillText('Список результатов:', CLOUD_X + TITLE_INDENT_X, CLOUD_Y + TITLE_INDENT_Y + FONT_SIZE * 1.1, CLOUD_WIDTH - 2 * TITLE_INDENT_X);

  var maxTime = getMaxElement(times);

  /* TODO: вообще нужно проверять и укорачивать массив игроков до 4 человек,
  т.к. больше не поместится в область + желательно выводить текущего игрока
  на первой позиции, а затем удалять его из массива, сортировать массив участников и
  выводить оставшихся 3-х участников*/

  /* TODO: желательно как-то проверять ширину выводимого текста и следить чтобы имена игроков
  и результат не вылезал по ширине за пределы ширины столбца, возможно даже лучше задавать ширину столбцу в гистограмме по
  максимальной ширине текстовой строки у игроков, рассчитывать сколько столбцов поместится на экран,
  обреать лишних игроков в массиве и выводить гистограмму, но так чтоб сохранялся результат текущего игрока и рекорд */

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(players[i], CLOUD_X + COLUMN_INTERVAL + (COLUMN_WIDTH + COLUMN_INTERVAL) * i, CLOUD_HEIGHT - GAP, COLUMN_WIDTH); // Имя игрока
    ctx.fillText(Math.floor(times[i]), CLOUD_X + COLUMN_INTERVAL + (COLUMN_WIDTH + COLUMN_INTERVAL) * i, CLOUD_HEIGHT - GAP - FONT_SIZE * 1.2 - (COLUMN_HEIGHT * times[i]) / maxTime, COLUMN_WIDTH); // Результат игрока
    ctx.fillStyle = 'rgba(5, 32, 237, ' + (Math.random() * 0.9 + 0.1) + ')'; // сложная формула, чтоб не получить ноль в прозрачности
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0)';
    }
    ctx.fillRect(CLOUD_X + COLUMN_INTERVAL + (COLUMN_WIDTH + COLUMN_INTERVAL) * i, CLOUD_HEIGHT - GAP - FONT_SIZE * 1.1 - (COLUMN_HEIGHT * times[i]) / maxTime, COLUMN_WIDTH, (COLUMN_HEIGHT * times[i]) / maxTime); // Гистограмма
  }
};

