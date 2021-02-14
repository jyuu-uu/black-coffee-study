import {initFilters} from './todoFilter.js';
import {inittodoList} from './todoList.js';

// 웹페이지 로드 시 init() 실행
window.onload = () => init();

function init(){
    // 다른 .js 의 init() 함수들 호출
    inittodoList();
    initFilters();
}