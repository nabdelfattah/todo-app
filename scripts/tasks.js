import { dragHintEl, listManagerEl, tasksListEl } from './DOM-Vendor';
import { setStorageData } from './storage';

export class Task {
  constructor(tasksArr = []) {
    this.tasksArr = tasksArr;
  }

  addTaskHandler(e) {
    const taskText = e.currentTarget.value;
    if (!taskText) return;
    if (this.isExist(taskText)) {
      alert('This task already exist.🗒️');
      return;
    }
    const taskEl = this.createTaskElement(taskText, false);
    this.tasksArr.push({ content: taskText, isDone: false });
    tasksListEl.prepend(taskEl);
    setStorageData('tasks', this.tasksArr);
    e.currentTarget.value = '';
    this.manageListManagementPanel();
    this.manageDragHint();
  }

  checkHandler(e) {
    let isCompleted;
    const taskText = e.currentTarget.nextElementSibling.innerText;
    if (e.currentTarget.parentElement.classList.contains('task--checked')) {
      e.currentTarget.parentElement.classList.remove('task--checked');
      isCompleted = false;
    } else {
      e.currentTarget.parentElement.classList.add('task--checked');
      isCompleted = true;
    }
    const itemIndex = this.tasksArr.findIndex((item) => item.content == taskText);
    this.tasksArr[itemIndex].isDone = isCompleted;
    setStorageData('tasks', this.tasksArr);
  }

  deleteHandler(e) {
    const taskText = e.currentTarget.previousElementSibling.innerText;
    const itemIndex = this.tasksArr.findIndex((item) => item.content == taskText);
    this.tasksArr.splice(itemIndex, 1);
    setStorageData('tasks', this.tasksArr);
    e.currentTarget.closest('.task').remove();
    this.manageListManagementPanel();
    this.manageDragHint();
  }

  filterHandler(e) {
    const filterType = e.target.innerText.toLowerCase();
    const filteredTasks = this.getFilteredTasks(filterType);
    tasksListEl.innerHTML = '';
    this.renderTasksInUI(filteredTasks);
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
    this.tasksArr = this.tasksArr.filter((task) => !task.isDone);
    tasksListEl.innerHTML = '';
    setStorageData('tasks', this.tasksArr);
    this.renderTasksInUI(this.tasksArr);
  }

  isExist(text) {
    return this.tasksArr.some((task) => task.content == text);
  }

  manageDragHint() {
    dragHintEl.style.display = this.tasksArr.length > 1 ? 'block' : 'none';
  }

  manageListManagementPanel() {
    listManagerEl.style.display = this.tasksArr.length > 0 ? 'flex' : 'none';
  }
}
