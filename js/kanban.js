
class Task {
  constructor(id, title, column) {
    this.id = id;
    this.title = title;
    this.column = column; 
  }
}


const todoList = document.getElementById('todoList');
const inprogressList = document.getElementById('inprogressList');
const doneList = document.getElementById('doneList');
const addBtn = document.getElementById('addTask');
const titleInput = document.getElementById('taskTitle');
const columnSelect = document.getElementById('taskColumn');
const clearBoardBtn = document.getElementById('clearBoard');

let tasks = []; 


const STORAGE_KEY = 'kanban_tasks_v1';

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    tasks = parsed.map(t => new Task(t.id, t.title, t.column));
  } catch(e) {
    tasks = [];
  }
}


function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = 'task';
  div.draggable = true;
  div.dataset.id = task.id;
  div.textContent = task.title;

  
  div.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    div.classList.add('dragging');
  });
  div.addEventListener('dragend', () => div.classList.remove('dragging'));

  
  div.addEventListener('dblclick', () => {
    if (confirm('Eliminar tarea?')) {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderBoard();
    }
  });

  return div;
}

function renderBoard() {
  
  [todoList, inprogressList, doneList].forEach(c => c.innerHTML = '');
  for (const t of tasks) {
    const el = createTaskElement(t);
    if (t.column === 'todo') todoList.appendChild(el);
    else if (t.column === 'inprogress') inprogressList.appendChild(el);
    else if (t.column === 'done') doneList.appendChild(el);
  }
}


const columns = document.querySelectorAll('.column');
columns.forEach(col => {
  col.addEventListener('dragover', (e) => {
    e.preventDefault();
    col.classList.add('drag-over');
  });
  col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
  col.addEventListener('drop', (e) => {
    e.preventDefault();
    col.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.column = col.dataset.column;
      saveTasks();
      renderBoard();
    }
  });
});


addBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const column = columnSelect.value;
  if (!title) {
    alert('Agrega un título para la tarea.');
    return;
  }
  const id = 't' + Date.now();
  const task = new Task(id, title, column);
  tasks.push(task);
  saveTasks();
  renderBoard();
  titleInput.value = '';
  titleInput.focus();
});


clearBoardBtn.addEventListener('click', () => {
  if (!confirm('Borrar todas las tareas?')) return;
  tasks = [];
  saveTasks();
  renderBoard();
});


loadTasks();
renderBoard();
