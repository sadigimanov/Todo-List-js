// butun elementleri secmek

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners(); 

function eventListeners(){     // All event listeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUi)
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

// delete all todos

function clearAllTodos(e){
    if(confirm("Tumunu silmek istediyinize eminmisiniz ?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
        
    }
}


// filtration

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block")
        }
    })
}

// delete todos
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo basariyla silindi");
    }
}

// delete from local
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // delete value from array
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos))
}

function loadAllTodosToUi(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUi(todo)
    })
}

// add todo
function addTodo(e){
    const newTodo = todoInput.value.trim();    // trim- To delete the spaces before and after the text
    
    if(newTodo === ""){
        showAlert("danger","Bir todo girin")  //(type,message)
    }
    // The code we got from Bootstrap:

    /*<div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
       </div>
    */
    
    else{
        addTodoToUi(newTodo);
        addTodoToStorage(newTodo);
    }



    e.preventDefault();
}

function getTodosFromStorage(){  // Retrieving todos from storage
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));  //JSON.parse - To convert from string to array
    }

    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos))  // JSON.stringify - To convert arrays to strings
    
}

// add alert

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    firstCardBody.appendChild(alert);

    //setTimeout
    setTimeout(function(){       
        alert.remove();
    },1000);                 // Alert will be deleted after 1 second

}
function addTodoToUi(newTodo){  // Added the string value to the UI as a list item


/*
<!--<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>-->
                         */
    // Yaratmaq hissesi
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    // Link
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    //List
    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    
    // Adding a list item to Todo List

    todoList.appendChild(listItem);
    todoInput.value = "";  // After typing and pressing enter, the text in the input is deleted.
}