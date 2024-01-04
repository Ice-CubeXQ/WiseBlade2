// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

window.addEventListener("load", function (e) {
  document.body.insertAdjacentHTML("beforeend", `<div class="main-bg"></div>`);
});

if (document.title === "Вход" || document.title === "Регистрация") {
  const menuItems = document.querySelectorAll(".menu__list .menu__item");
  const lastMenuItem = menuItems[menuItems.length - 1];
  lastMenuItem.style.cssText = `display: none;`;
}
