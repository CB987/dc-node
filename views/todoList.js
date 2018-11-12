function todoToItem(todoObject) {
    return `
    <li class="todo-list-item">
    ${todoObject.name}
    </li>
    `;
}

function todoList(arayofTodos) {
    const todoItems = arrayofTodos.map(todoToItem).join('');
    return `
        <ul>
            ${todoItems}
        </ul>
    `;
}

module.exports = todoList;