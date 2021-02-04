const $ = (selector) => document.querySelector(selector);

let todos = [ 
  { id: 1, text: 'Make some lunch and dessert' },
  { id: 2, text: 'Clean the kitchen floor' },
  { id: 3, text: 'Book man and a van' },
  { id: 4, text: 'Invest some of the income' },
  { id: 5, text: 'Online learning on Youtube' },
  { id: 6, text: 'Start working out at the gym' } 
];

let count = todos.length;

todos.forEach(item => createOneTodo(item));

function addTodo(text) {
  count++;
  createOneTodo({ id:count, text });
  todos.push({ id:count, text });
}

// Create one todo
function createOneTodo(item) {
  const li = document.createElement('li');
  li.id = item.id;
  const content = document.createElement('input');
  content.maxLength = 30;
  content.className = 'content';
  content.value = item.text;
  li.append(content);
  const saveBtn = createSaveBtn();
  li.append(saveBtn);
  const deleteBtn = createDeleteBtn();
  li.append(deleteBtn);
  li.addEventListener('dblclick', (e) => {
    e.currentTarget.classList.toggle('active');
  });
  $('#container').append(li);
}

// Create delete button
function createDeleteBtn() {
  const btn = document.createElement('span');
  btn.textContent = '×';
  btn.className = 'delete-btn';
  btn.addEventListener('click', (e) => { 
    const id = e.target.parentNode.id;
    todos = todos.filter(item => item.id != id);
    e.target.parentNode.remove();
  });
  return btn;
}

// Create save button
function createSaveBtn() {
  const btn = document.createElement('span');
  btn.textContent = '💾';
  btn.className = 'save-btn';
  btn.addEventListener('click', (e) => { 
    const id = e.target.parentNode.id;
    console.log('save');
  });
  return btn;
}

// CLICK: add an item 
$('#todo-add').addEventListener('click', e => {
  addTodo($('#todo-text').value);
});

// KEYUP: validate and toggle Add button
$('#todo-text').addEventListener('keyup', e => {
  $('#todo-add').disabled = e.target.value.length == 0;
});

// KEYUP: filter items
$('#todo-filter').addEventListener('keyup', e => {
   $('#container').innerHTML = '';
  let found = [];
  if (e.target.value.length) {
    found = todos.filter(item => item.text.toLowerCase().includes(e.target.value));
  } else {
    found = [...todos];
  }
  found.forEach(item => createOneTodo(item));
});