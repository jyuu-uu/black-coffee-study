

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");
const $toggleInput = document.querySelector(".toggle");
const $countContainer = document.querySelector(".count-container");
const $todoCount = $countContainer.querySelector(".todo-count");
const $filters = $countContainer.querySelector(".filters");

$todoInput.addEventListener("keyup", onAddTodoItem);
$todoList.addEventListener("click", onToggleTodoItem);
$todoList.addEventListener("click", onDeleteTodoItem);
$todoList.addEventListener("dblclick", onEditTodoItem);
$filters.addEventListener("click", onFilterTodoItem);
const TODOS_LS = "todoitem";
let toDos = [];

loadTodoItems();


// 전체보기/해야할 일/완료한 일 상태 아이템만 보여주기
function onFilterTodoItem(event){
    const targetA = event.target; //a
    const li = targetA.parentNode; //li
    li.querySelectorAll('a').forEach(child =>{
        child.classList.remove('selected');
    });
    targetA.classList.add('selected');
    //. . . .여기 해야함

    console.log(li);
}

// todoItem 수정 이벤트
function onEditTodoItem(event){
    const targetLabel = event.target;
    const targetParentLi = targetLabel.parentNode.parentNode;
    console.log(targetParentLi.id);

    if(targetLabel.classList.contains("label")){
        targetParentLi.classList.add("editing");
        const targetInput = targetParentLi.querySelector(".edit");
        targetInput.focus();

        targetInput.addEventListener("keyup", function(e){
            if(e.key === "Enter" && targetInput.value !== ""){
                const newtodos = toDos.map((value, i) =>{
                    if(i === parseInt(targetParentLi.id)){
                        title = targetInput.value;
                    }
                    else{
                        title = value.title;
                    }
                    id = i;

                    return {
                        title,
                        id
                    };
                });
                //toDos[parseInt(targetParentLi.id)] = todo;
                console.log(newtodos);
                setTodoItem(newtodos);
                loadTodoItems();
                targetParentLi.classList.remove("editing");

            }else if(e.key === "Escape"){
                targetParentLi.classList.remove("editing");
            }
        });
    }
}

// todoItem 추가 이벤트
function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    saveTodoItem(todoTitle);
    const todoitem = toDos[toDos.length-1];
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoitem.title, todoitem.id));
    event.target.value = "";
  }
}

// todoItem 을 localStorage 에 저장
function saveTodoItem(title){
    const todo = {
        title : title,
        id : toDos.length,
    }
    toDos.push(todo);
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    getTodoItemCount();
}

function setTodoItem(todos){
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

// todoItems 들을 localStorage 에서 가져오기
function loadTodoItems(){
    const loadtodoitems = localStorage.getItem(TODOS_LS);
    if(loadtodoitems !== null){
        $todoList.querySelectorAll('li').forEach(child =>{
            $todoList.removeChild(child);
        });
        const parseItems = JSON.parse(loadtodoitems);
        const newtoDos = parseItems.map((value, i) => {
            title = value.title;
            id = i;

            return {
                title,
                id
            };
        });
        console.log(newtoDos);
        toDos = newtoDos;
        toDos.forEach(todo => {
            $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todo.title, todo.id));
        });   
        getTodoItemCount(); 
    }
}

// todoItems 개수 설정하기
function getTodoItemCount(){
    const todoCount = $todoCount.querySelector("strong");
    const itemsCount = toDos.length;
    todoCount.textContent = itemsCount;
}

// todoItem 중 checkbox 만 클릭될 때 completed class 추가
function onToggleTodoItem(event) {
    // checkbox
    if(event.target.type === "checkbox"){
        event.target.closest("li").classList.toggle("completed");

        if(event.target.classList.contains("checked")){
            event.target.classList.remove("checked");
        }else{
            event.target.classList.add("checked");
        }
    }
}

// todoItem 중 destroy 버튼만 클릭될 때 destory class 추가
function onDeleteTodoItem(event){
    //delete todo
    if(event.target.classList.contains("destroy")){
        const deltodoItem = event.target.parentNode.parentNode; //li
        const newTodo = toDos.filter(function(todo){
            return todo.id !== parseInt(deltodoItem.id);
        });
        toDos = newTodo;
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
        loadTodoItems();
        //$todoList.removeChild(deltodoItem);
    }
}

function renderTodoItemTemplate(title, id) {
  return ` <li id="${id}">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`;
}