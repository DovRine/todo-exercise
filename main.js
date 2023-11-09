const form = document.querySelector("form")
const idInput = form.querySelector("input[name=id]")
const nameInput = form.querySelector("input[name=todo]")

const templ = document.querySelector("#todo-item")
const todoList = document.querySelector(".todos")

let todos = []

function getTodos() { return todos }
function deleteTodo(e) {
    const todo = e.target.closest("div")
    const id = todo.querySelector(".todo-id").textContent
    const idx = todos.findIndex(t => t.id === id)
    todos.splice(idx, 1)
    render()
}
function showEditForm(e) {
    const todo = e.target.closest("div")
    const id = +todo.querySelector(".todo-id").textContent
    const idx = todos.findIndex(t => t.id === id)
    nameInput.value = todos[idx].todo
    idInput.value = todos[idx].id
}
function resetForm(){
    idInput.value = "-1"
    nameInput.value = ''
}
function handleSubmit(e) {
    e.preventDefault()
    const id = +idInput.value
    const todo = nameInput.value

    if (id === -1) {
        // add mode
        const id = new Date().getTime()
        todos.push({ id, todo })
    } else {
        // edit mode
        todos = todos.map(t => {
            return t.id === id
                ? { ...t, todo }
                : t
        })
    }

    resetForm()
    render()
}

function render() {
    const todos = getTodos()
    todoList.innerHTML = ""
    for (const { id, todo } of todos) {
        const newTodo = templ.content.cloneNode(true)
        newTodo.querySelector(".todo-name").textContent = todo
        newTodo.querySelector(".todo-id").textContent = id
        newTodo.querySelector(".btn-edit").addEventListener("click", showEditForm)
        newTodo.querySelector(".btn-delete").addEventListener("click", deleteTodo)
        todoList.append(newTodo)
    }
}

form.addEventListener("submit", handleSubmit)

render()
