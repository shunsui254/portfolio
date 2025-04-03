// Store todos in memory
let todos = [];

// Add new todo item
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text) {
        todos.push({ text, completed: false }); // Create new todo object
        input.value = ''; // Clear input field
        renderTodos(); // Update UI
    }
}

// Add event listener for Enter key
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Toggle todo completion status
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Remove todo item
function deleteTodo(index) {
    todos.splice(index, 1); // Remove item at index
    renderTodos();
}

// Render todo list to DOM
function renderTodos() {
    const list = document.getElementById('todoList');
    // Map todos array to HTML string
    list.innerHTML = todos.map((todo, index) => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onclick="toggleTodo(${index})">
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        </li>
    `).join('');
}