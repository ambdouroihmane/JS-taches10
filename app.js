// SELECTEUR
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// FONCTIONS
function addTodo(event) {
    event.preventDefault();

    // Creer Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.style.background = "white";
    // Créer le Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Ajouter la todo au localStorage
    saveLocalTodos(todoInput.value);

    // Button To do
    const todoBTN = document.createElement("button");
    todoBTN.innerHTML = 'TO DO';
    todoBTN.classList.add("todo-btn");
    todoDiv.appendChild(todoBTN);

    // Button Doing
    const doingButton = document.createElement("button");
    doingButton.innerHTML = 'DOING';
    doingButton.classList.add("doing-btn");
    todoDiv.appendChild(doingButton);

    // Button Done
    const doneButton = document.createElement("button");
    doneButton.innerHTML = 'DONE';
    doneButton.classList.add("done-btn");
    todoDiv.appendChild(doneButton);

    // Ajouter notre Todo A TODO-LIST
    todoList.appendChild(todoDiv);

    todoInput.value = ""
}

// Fonction pour suprimer un todo list
function deleteCheck(e) {
    const item = e.target;
    const parent = item.parentNode;
    let nomColor = JSON.parse(localStorage.getItem("todos"))

    /**
     * rouge : #dc3545
     * jaune : #ffc107
     * vert :  #198754
     */

    // TO DO
    if (item.classList[0] === "todo-btn") {
        const previousSibling = item.previousElementSibling;
        parent.style.background = "#dc3545";
        nomColor.forEach((element) => {
            if(element.valeur === previousSibling.textContent){
                element.color = "#dc3545";
            }

            console.log(element);
        })

        localStorage.setItem("todos",JSON.stringify(nomColor));
    }

    // DOING
    if (item.classList[0] === "doing-btn") {
        parent.style.background = "#ffc107";
        let sibling = item.previousElementSibling;

        for (let i = 0; i < 1; i++) { // 1 car on veut le 2ème frère précédent
            if (sibling) {
                sibling = sibling.previousElementSibling;
            }
        }

        // console.log(sibling.textContent);
        nomColor.forEach((element) => {
            if(element.valeur === sibling.textContent){
                element.color = "#ffc107";
            }

            console.log(element);
        })

        localStorage.setItem("todos",JSON.stringify(nomColor));
    }

    // DONNE
    if (item.classList[0] === "done-btn") {
        parent.style.background = "#198754";

        let sibling = item.previousElementSibling;

        for (let i = 0; i < 2; i++) { // 1 car on veut le 2ème frère précédent
            if (sibling) {
                sibling = sibling.previousElementSibling;
            }
        }

        // console.log(sibling.textContent);
        nomColor.forEach((element) => {
            if(element.valeur === sibling.textContent){
                element.color = "#198754";
            }

            console.log(element);
        })

        localStorage.setItem("todos",JSON.stringify(nomColor));
    }
}


// Fonction pour stocker les todos dans localStorage
function saveLocalTodos(todo) {
    // Checker si il y'a des items existant
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push({ valeur: todo, color: "white" });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Fonction pour réccuperer et afficher les donné localStorage
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }


    todos.forEach(function (todo) {
        // Creer Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.style.background = todo.color;

        // Créer le Li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo.valeur;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Button To do
        const todoBTN = document.createElement("button");
        todoBTN.innerHTML = 'TO DO';
        todoBTN.classList.add("todo-btn");
        todoDiv.appendChild(todoBTN);

        // Button Doing
        const doingButton = document.createElement("button");
        doingButton.innerHTML = 'DOING';
        doingButton.classList.add("doing-btn");
        todoDiv.appendChild(doingButton);

        // Button Done
        const doneButton = document.createElement("button");
        doneButton.innerHTML = 'DONE';
        doneButton.classList.add("done-btn");
        todoDiv.appendChild(doneButton);

        // Ajouter notre Todo A TODO-LIST
        todoList.appendChild(todoDiv);
    })
}
