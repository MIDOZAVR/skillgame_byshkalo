const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  $(".game-field").removeClass("target");
  $(".game-field").html("");


  let divSelector = randomDivId();

  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).html(hits + 1);

  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === 0) {
    firstHitTime = getTimestamp();
  }


  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {

  $(".game-field").hide()
  
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  

  $(".game-field").click(handleClick);

  $("#button-start").click(function() {
      round();
      $("#button-start").hide();
    });
  


  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
