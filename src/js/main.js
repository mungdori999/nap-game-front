import { loadGame } from "./game.js";
import { loadMenu } from "./menu.js";

$(document).ready(function () {
  $("#header").load("header.html");

  $("#menu").load("menu.html", function () {
    loadMenu();
  });

  loadGame();
});
