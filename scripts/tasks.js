import {
  counterEl, dragHintEl, listManagerEl, tasksListEl,
} from './DOM-Vendor';
import { setStorageData } from './storage';

export class Task {
  constructor(tasksArr = []) {
    this.tasksArr = tasksArr;
    this.excessCounter = counterEl.innerText;
    this.excessTasksArr = [];
    this.hiddenTasksElArr = [];
  }

  addTaskHandler(e) {
    const taskText = e.currentTarget.value.trim();
    if (!taskText) return;
    if (this.isExist(taskText)) {
      alert('This task already exist.🗒️');
      return;
    }
    // create task in UI
    const taskEl = this.createTaskElement(taskText, false);
    tasksListEl.prepend(taskEl);
    // create task in local storage
    this.tasksArr.push({ content: taskText, isDone: false });
    setStorageData('tasks', this.tasksArr);
    // reset the input field
    e.currentTarget.value = '';
    this.manageListManagementPanel();
    this.manageDragHint();
    this.hideExcessTasks();
  }

  checkHandler(e) {
    let isCompleted;
    // edit task in UI
    const taskText = e.currentTarget.nextElementSibling.innerText;
    if (e.currentTarget.parentElement.classList.contains('task--checked')) {
      e.currentTarget.parentElement.classList.remove('task--checked');
      isCompleted = false;
    } else {
      e.currentTarget.parentElement.classList.add('task--checked');
      isCompleted = true;
    }
    // edit task in local storage
    const itemIndex = this.tasksArr.findIndex((item) => item.content == taskText);
    this.tasksArr[itemIndex].isDone = isCompleted;
    setStorageData('tasks', this.tasksArr);
  }

  deleteHandler(e) {
    // delete from local storage
    const taskText = e.currentTarget.previousElementSibling.innerText;
    const itemIndex = this.tasksArr.findIndex((item) => item.content == taskText);
    this.tasksArr.splice(itemIndex, 1);
    setStorageData('tasks', this.tasksArr);
    // delete from UI
    e.currentTarget.closest('.task').remove();
    this.showExcessTasks();
    this.manageListManagementPanel();
    this.manageDragHint();
  }

  filterHandler(e) {
    // get filter type
    const filterType = e.target.innerText.toLowerCase();
    // get Selected tasks
    const filteredTasks = this.getFilteredTasks(filterType);
    // remove all tasks from UI
    tasksListEl.innerHTML = '';
    // rerender task as selected
    this.renderTasksInUI(filteredTasks);
    this.manageDragHint();
  }

  createTaskElement(text, isCompleted) {
    const taskEl = document.createElement('li');
    taskEl.className = `task ${isCompleted ? 'task--checked' : ''}`;
    taskEl.innerHTML = `
    <div class="icon check-box" aria-label="Check as complete" tabindex="0" >
      <img class="icon-check" src="images/icon-check.svg" alt="check icon" />
    </div>
    <p class="task-text">${text}</p>
    <img class="icon icon-delete" aria-label="Delete task" tabindex="0"
      src="images/icon-cross.svg" alt="delete icon" />`;
    taskEl.firstElementChild.addEventListener('click', (e) => this.checkHandler(e));
    taskEl.lastElementChild.addEventListener('click', (e) => this.deleteHandler(e));
    return taskEl;
  }

  renderTasksInUI(arr) {
    const tasksElArr = arr.map((item) => this.createTaskElement(item.content, item.isDone));
    tasksListEl.prepend(...tasksElArr.reverse());
    this.manageDragHint();
    this.hideExcessTasks();
    this.showExcessTasks();
  }

  getFilteredTasks(filter) {
    switch (filter) {
      case 'active':
        return this.tasksArr.filter((el) => !el.isDone);
      case 'completed':
        return this.tasksArr.filter((el) => el.isDone);
      default:
        return this.tasksArr;
    }
  }

  clearCompletedTasks() {
    // get active tasks
    this.tasksArr = this.tasksArr.filter((task) => !task.isDone);
    // remove all tasks from UI
    tasksListEl.innerHTML = '';
    // render active tasks in UI
    this.renderTasksInUI(this.tasksArr);
    // store only active tasks in local storage
    setStorageData('tasks', this.tasksArr);
    this.manageListManagementPanel();
    this.showExcessTasks();
  }

  hideExcessTasks() {
    // get all the li elements
    const tasksElsArr = Array.from(tasksListEl.children);
    // if they are > 6, then, hide the excess
    if (tasksElsArr.length > 6) {
      // get the 7th li and the rest
      const excessTasks = tasksElsArr.slice(6);
      this.hiddenTasksElArr = excessTasks;
      // hide them
      excessTasks.forEach((task) => {
        task.style.display = 'none';
      });
      // update the excessCounter, update the UI counter
      this.excessCounter = excessTasks.length;
      counterEl.innerText = this.excessCounter;
    }
  }

  showExcessTasks() {
    // have hidden DOM elements
    if (this.excessCounter) {
      // loop for the number of hidden elements
      for (let i = 0; i < this.excessCounter; i++) {
        const displayedTasks = this.getDisplayedTasks();
        if (displayedTasks.length == 6) {
          return;
        }
        // remove the element that should be shown from hiddentasksElArr
        const targetEl = this.hiddenTasksElArr[0];
        this.hiddenTasksElArr.splice(0, 1);
        // reveal that element
        targetEl.style.display = 'flex';
        // decrement the excessCounter, update the UI counter
        this.excessCounter -= 1;
        counterEl.innerText = this.excessCounter;
      }
    }
  }

  isExist(text) {
    return this.tasksArr.some((task) => task.content == text);
  }

  getDisplayedTasks() {
    return Array.from(tasksListEl.children).filter((el) => el.style.display != 'none');
  }

  manageDragHint() {
    const displayedTasks = this.getDisplayedTasks();
    dragHintEl.style.display = displayedTasks.length > 1 ? 'block' : 'none';
  }

  manageListManagementPanel() {
    listManagerEl.style.display = this.tasksArr.length > 0 ? 'flex' : 'none';
  }
}
