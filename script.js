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

todos.forEach(item => renderOneTodo(item));

function addTodo(text) {
  count++;
  renderOneTodo({ id:count, text });
  todos.push({ id:count, text });
}

function renderOneTodo(item) {
  const li = document.createElement('li');
  li.id = item.id;
  const content = document.createElement('span');
  content.className = 'content';
  content.textContent = item.text;
  li.append(content);
  const deleteBtn = getDeleteBtn();
  li.append(deleteBtn);
  li.addEventListener('dblclick', (e) => {
    e.currentTarget.classList.toggle('active');
  });
  $('#container').append(li);
}

function getDeleteBtn() {
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

$('#todo-add').addEventListener('click', e => {
  addTodo($('#todo-text').value);
});

$('#todo-text').addEventListener('keyup', e => {
  $('#todo-add').disabled = e.target.value.length == 0;
});

$('#todo-filter').addEventListener('keyup', e => {
   $('#container').innerHTML = '';
  let found = [];
  if (e.target.value.length) {
    found = todos.filter(item => item.text.toLowerCase().includes(e.target.value));
  } else {
    found = [...todos];
  }
  found.forEach(item => renderOneTodo(item));
});