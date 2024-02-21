import {
  clearCompletedBtn,
  dragHintEl, filterElements, hideElements, inputEl, listManagerEl, themeEl,
} from './DOM-Vendor';
import { getStorageData } from './storage';
import { Task } from './tasks';
import { toggleTheme, applyTheme } from './theme';

// On App Start, fetch user's old data if exist

const storedTasks = getStorageData('tasks');
export const tasks = new Task(storedTasks || []);
if (tasks.tasksArr.length) {
  tasks.renderTasksInUI(tasks.tasksArr);
} else {
  hideElements(listManagerEl, dragHintEl);
}

const theme = getStorageData('theme');
if (!theme || theme == 'light') {
  applyTheme('main', 'light', '../images/icon-moon.svg');
} else {
  applyTheme('main dark', 'dark', '../images/icon-sun.svg');
}

// App Events
themeEl.addEventListener('click', toggleTheme);
inputEl.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    e.preventDefault();
    tasks.addTaskHandler(e);
  }
});
filterElements.addEventListener('click', (e) => tasks.filterHandler(e));
clearCompletedBtn.addEventListener('click', tasks.clearCompletedTasks.bind(tasks));
