import './style.css';
import { todos, addTask, deleteTask, editTask, loadTasks, } from './todo';
import { updateTaskCompletion, clearCompleted } from './status';

function showList() {
  loadTasks();
  const taskList = document.getElementById('todo-list');
  taskList.innerHTML = '';
  todos.sort((a, b) => a.index - b.index);
  todos.forEach((todo, index) => {
    const item = document.createElement('li');
    const itemDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    const itemSpan = document.createElement('span');
    const deleteButton = document.createElement('i');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    checkbox.addEventListener('change', function (event) {
      const index = parseInt(itemSpan.dataset.index);
      const completed = event.target.checked;
      itemSpan.className = '';
      updateTaskCompletion(index, completed);
      showList()
    });

    itemSpan.textContent = todo.description;
    itemSpan.className = todo.completed ? 'completed' : '';
    itemSpan.dataset.index = index;
    itemSpan.setAttribute('contenteditable', !todo.completed);
    itemDiv.className = 'task-item';

    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(itemSpan);



    const className = 'fas fa-trash-alt text-danger float-end delete-button';
    deleteButton.className = className;

    item.appendChild(itemDiv);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });
}

document.getElementById('add-task-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const taskDescription = document.getElementById('task-input').value;
  addTask(taskDescription);
  showList();
  document.getElementById('task-input').value = '';
});

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-button')) {
    const listItem = event.target.parentNode;
    const index = parseInt(listItem.querySelector('span').dataset.index);
    deleteTask(index);
    listItem.remove();
    showList();
  }
});

document.addEventListener('input', function (event) {
  if (event.target.tagName === 'SPAN') {
    const listItem = event.target;
    const index = parseInt(listItem.dataset.index);
    const newDescription = listItem.textContent.trim();
    editTask(index, newDescription);
  }
});

document.addEventListener('blur', function (event) {
  if (event.target.tagName === 'SPAN') {
    showList();
  }
});

document.getElementById('clear-completed-button').addEventListener('click', () => {
  clearCompleted();
  showList();
});


document.addEventListener('DOMContentLoaded', function () {
  loadTasks();
  showList();
});

export { showList };