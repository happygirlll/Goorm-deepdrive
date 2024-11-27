const addTodoButton = document.getElementById("addTodoButton");
const todoList = document.getElementById("todoList");

addTodoButton.onclick = () => {
    createTodoItem();
};

function createTodoItem() {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => {
        todoItem.classList.toggle("completed");
    };

    const todoInput = document.createElement("input");
    todoInput.type = "text";
    todoInput.disabled = true; 

    const editButton = document.createElement("button");
    editButton.textContent = "수정";
    editButton.className = "edit";
    editButton.onclick = () => {
        todoItem.classList.add("editing"); //테두리 추가
        todoInput.disabled = false; // 수정 가능 상태로 변경
        todoInput.classList.add("editing-input"); // 하단 선 추가
        todoInput.focus(); // 입력창에 포커스
        todoInput.onblur = () => {
            todoInput.disabled = true; 
            todoInput.classList.remove("editing-input"); 
            todoItem.classList.remove("editing");
        };
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
        todoList.removeChild(todoItem);
    };

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoInput);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
}