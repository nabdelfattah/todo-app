import {
  clearCompletedBtn,
  dragHintEl, filterElements, hideElements, inputEl, listManagerEl, themeEl,
} from './DOM-Vendor';
import { getStorageData } from './storage';
import { Task } from './tasks';
import { toggleTheme, applyTheme } from './theme';

import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';

// On App Start, fetch user's old data if exist

const storedTasks = getStorageData('tasks');
export const tasks = new Task(storedTasks || []);
if (tasks.tasksArr.length) {
  tasks.renderTasksInUI(tasks.getFilteredTasks(tasks.currentFilterType));
} else {
  hideElements(listManagerEl, dragHintEl);
}

const theme = getStorageData('theme');
if (!theme || theme == 'light') {
  applyTheme('main', 'light', moonIcon);
} else {
  applyTheme('main dark', 'dark', sunIcon);
}

// App Events
themeEl.addEventListener('click', toggleTheme);
inputEl.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    e.preventDefault();
    tasks.addTaskHandler(e);
  }
});
filterElements.addEventListener('click', (e) => tasks.filterHandler(e.target.innerText.toLowerCase()));
clearCompletedBtn.addEventListener('click', tasks.clearCompletedTasks.bind(tasks));

document.querySelector('.reset').addEventListener('click', tasks.resetHandler.bind(tasks))