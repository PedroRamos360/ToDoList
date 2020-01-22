var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var contadorDeCliques = 0;

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    listElement.innerHTML = '';

    for (todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);
        
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        var linkText = document.createTextNode(' Excluir');
        linkElement.appendChild(linkText);
        
        var checkElement = document.createElement('a');
        checkElement.setAttribute('href', '#');

        var checkText = document.createTextNode('|  Concluido');
        checkElement.appendChild(checkText);

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        var pos2 = todos.indexOf(todo);
        checkElement.setAttribute('onclick', 'checkTodo(' + pos2 + ')');

        todoElement.appendChild(todoText);
        listElement.appendChild(todoElement);
        todoElement.appendChild(linkElement);
        todoElement.appendChild(checkElement);
    }
}

renderTodos();

function addTodo() {
    var todoText = inputElement.value;
    todos.push(todoText);
    inputElement.value = '';
    renderTodos();
    saveStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
    todos.splice(pos, 1);
    renderTodos();
    saveStorage();
}

var check = document.createElement("span");
check.class = "emoji";
check = "✔️";

function checkTodo(pos) {
    todos.splice(pos, 1, todos[pos] + check);
    renderTodos();
    saveStorage();
}

function saveStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}