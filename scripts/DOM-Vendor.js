const mainEl = document.querySelector('.main');
const themeEl = document.querySelector('.theme-toggle-icon');
const inputEl = document.querySelector('.input');
const tasksListEl = document.querySelector('.task-list');
const listManagerEl = document.querySelector('.list-management-panel');
const filterElements = document.querySelector('.filter');
const clearCompletedBtn = document.querySelector('.btn-clear');
const dragHintEl = document.querySelector('.drag-hint');

function hideElements(...elements) {
  elements.forEach((element) => { element.style.display = 'none'; });
}
function showElements(...elements) {
  elements.forEach((element) => { element.style.display = 'initial'; });
}

export {
  mainEl, themeEl, inputEl, tasksListEl,
  listManagerEl, filterElements, dragHintEl, clearCompletedBtn,
  hideElements, showElements,
};
