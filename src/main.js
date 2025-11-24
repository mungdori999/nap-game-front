import { loadGame } from "./game.js";

$(document).ready(function () {
  $("#header").load("header.html");
  $("#menu").load("menu.html");
});

loadGame();
