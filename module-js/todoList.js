import {TODO_LS, todoItemsArray, updateCount} from './todoCount.js';

const $todoList = document.querySelector('ul.todo-list');
const $todoInput = document.querySelector('#new-todo-title');

export function inittodoList () {
    // item 그리기 - ok
    drawTodoItem();

    // item 이벤트들
    // item 추가 - ok
    $todoInput.addEventListener("keyup", onAddTodoItem);
    // item 삭제
    // item 수정
    $todoList.addEventListener("click", onDeleteTodoItem);
    $todoList.addEventListener("dblclick", onEditTodoItem);
    // item 완료
    $todoList.addEventListener("click", onToggleTodoItem);
    
    const superhandle = {
        click : function (e){
            console.log("djdj");
        },
    };
    
    const logo = document.querySelector('.header h1');
    logo.addEventListener("click", superhandle.click);
    
}

// item 그리기
function drawTodoItem(){
    const todoArray = JSON.parse(localStorage.getItem(TODO_LS));
    if(todoArray !== null){
        $todoList.querySelectorAll('li').forEach(child =>{
            $todoList.removeChild(child);
        });
        const newItems = todoArray.map((value, i)=>{
            const title = value.title;
            const id = i;
            const isCompeleted = value.isCompeleted;
            return {
                title,
                id,
                isCompeleted
            };
        });

        newItems.forEach(todo =>{
            $todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todo.title, todo.id, todo.isCompeleted === true ? "completed" : ""));
        });
    }
    updateCount();
}

// item 추가 - 이벤트
function onAddTodoItem(e){
    const todoTitle = e.target.value;
    if(e.key === 'Enter' && todoTitle !== ""){
        addNewTodoItem(todoTitle);
        e.target.value = "";
    }
}

// item 추가 - 함수
function addNewTodoItem(title){
    const todo = {
        title : title,
        id : todoItemsArray.length,
        isCompeleted : false,
    };
    console.log(todo);
    todoItemsArray.push(todo);
    localStorage.setItem(TODO_LS, JSON.stringify(todoItemsArray));
    drawTodoItem();
}

// item 삭제 - 이벤트
function onDeleteTodoItem(e){
    if(e.target.classList.contains("destroy")){
        const deltodo = e.target.parentNode.parentNode; // li
        const newtodos = todoItemsArray.filter(function(todo){
            return todo.id !== parseInt(deltodo.id);
        });
        localStorage.setItem(TODO_LS, JSON.stringify(newtodos));
        //todoItemsArray = JSON.parse(localStorage.getItem(TODO_LS));
        console.log(newtodos);
        drawTodoItem();
    }
}

// item 수정 - 이벤트
function onEditTodoItem(e){
    const targetLabel = e.target;
    const targetParentLi = targetLabel.parentNode.parentNode;

    if(targetLabel.classList.contains('label')){
        targetParentLi.classList.add("editind");
        const targetInput = targetParentLi.querySelector('.edit');
        targetInput.focus();

        targetInput.addEventListener("keyup", function(e){
            if(e.key === "Enter" && targetInput.value !== ""){
                const newtodos = todoItemsArray.map((value, i)=>{
                    if( i === parseInt(targetParentLi.id)){
                        title = targetInput.value;
                    }else{
                        title = value.title;
                    }
                    id = i;
                    isCompeleted = value.isCompeleted;

                    return {
                        title,
                        id,
                        isCompeleted
                    };
                });
                localStorage.setItem(TODO_LS, newtodos);
                drawTodoItem();
                targetParentLi.classList.remove("editing");
            }else if(e.key === "Escape"){
                targetParentLi.classList.remove("editing");
            }
        });
    }
}

// item 완료 - 이벤트
function onToggleTodoItem(e){
    if(e.target.type === "checkbox"){
        e.target.closest("li").classList.toggle("completed");
        e.target.classList.toggle("checked");
        //---수정---//
        //setCompletedItem(e.target.closest("li").id);
    }
}

// item 완료 - 함수
function setCompletedItem(liId){
    const newtodos2 = todoItemsArray.map((value, i)=>{
        const newcompleted = (i === liId) ? !value.isCompeleted : value.isCompeleted;
        return {
            title : value.title,
            id : i,
            isCompeleted : newcompleted
        };
    });
    console.log(newtodos2);
    localStorage.setItem(TODO_LS, JSON.stringify(newtodos2));
    drawTodoItem();
}

function renderTodoItemTemplate(title, id, isCompeleted) {
    return ` <li id="${id}" class="${isCompeleted}">
                    <div class="view">
                        <input class="toggle" type="checkbox">
                        <label class="label">${title}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${title}">
                </li>`;
  }