export const TODO_LS = "todoitems";
export const todoItemsArray = JSON.parse(localStorage.getItem(TODO_LS)) ?? [];

// localStorage 에서 items 불러와서 모두 배열에 저장
// 상태별로 배열 나누기
// 할 일 몇 개인지 출력

export function updateCount(){
    const selectedFilter = document.querySelector('ul.filters li a[class *= "selected"]');
    const todoItemsAll = document.querySelectorAll('ul.todo-list li');
    const todoItemsCompleted = document.querySelectorAll('ul.todo-list li.completed');
    const todoItemsCount = document.querySelector('.todo-count strong');

    if(selectedFilter.classList.contains('all')){
        todoItemsCount.textContent = todoItemsAll.length;
    }else if(selectedFilter.classList.contains('active')){
        todoItemsCount.textContent = todoItemsAll.length - todoItemsCompleted.length;
    }else if(selectedFilter.classList.contains('completed')){
        todoItemsCount.textContent = todoItemsCompleted.length;
    }
}