import { inputEl, themeEl } from './DOM-Vendor';
import { getStorageData } from './storage';
import { Task } from './tasks';
import { toggleTheme, applyTheme } from './theme';

const storedTasks = getStorageData('tasks');
const tasks = new Task(storedTasks || []);
if (tasks.tasksArr.length) {
  tasks.renderTasks(tasks.tasksArr);
}

const theme = getStorageData('theme');
if (!theme || theme == 'light') {
  applyTheme('main', 'light', '../images/icon-moon.svg');
} else {
  applyTheme('main dark', 'dark', '../images/icon-sun.svg');
}

themeEl.addEventListener('click', toggleTheme);
inputEl.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    e.preventDefault();
    tasks.addTaskHandler(e);
  }
});
