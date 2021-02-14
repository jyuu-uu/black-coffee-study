import {updateCount} from './todoCount.js';

// 필터 클릭할 때마다 상태 별 item 보여주기

const $filters = document.querySelector('ul.filters');
const $filtersAll = $filters.querySelector('li a.all');
const $filtersActive = $filters.querySelector('li a.active');
const $filtersCompleted = $filters.querySelector('li a.completed');

let selectedFilter = $filtersAll;

export function initFilters(){
    $filters.addEventListener("click", onChangeFilter);
}

function onChangeFilter(e){
    if(!e.target || e.target.nodeName !== "A"){
        return
    }

    selectedFilter.classList.remove('selected');
    
    const todoitems = document.querySelector('ul.todo-list').children; //li 들
    if(e.target.classList.contains('all')){
        selectedFilter = $filtersAll;
        for(let idx=0; idx<todoitems.length; idx += 1){
            todoitems[idx].style.display = "";
        }
    }else if(e.target.classList.contains('active')){
        selectedFilter = $filtersActive;
        for(let idx = 0; idx<todoitems.length; idx += 1){
            todoitems[idx].style.display = todoitems[idx].classList.contains('completed') === false ? "" : "none";
        }
    }else if(e.target.classList.contains('completed')){
        selectedFilter = $filtersCompleted;
        for(let idx = 0; idx<todoitems.length; idx += 1){
            todoitems[idx].style.display = todoitems[idx].classList.contains('completed') === true ? "" : "none";
        }
    }
    selectedFilter.classList.add('selected');
    updateCount();
}