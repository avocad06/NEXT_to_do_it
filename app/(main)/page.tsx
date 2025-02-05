import { BASE_API_URL, TID } from "../constants/consts";
import { TodoService } from "../services/todoservice";
import { square } from "../styles/fonts";
import type { ITodoItem } from '../types/types'
import TodoList from "./components/todolist/todolist";


export type TodoInline = Pick<ITodoItem, "id" | "name" | "isCompleted">

async function MainPage() {

    const todoData:TodoInline[] = await TodoService.fetchTodo();
    
    return (
        <main className={`g_main ${square.variable}`}>
            <TodoList todoData={todoData} />
        </main>
    )
}



/**
 * data를 fecthing 하는 함수
 * @description 이 함수는 컴포넌트 안에 있을 필요 없습니다
 */

async function getTodoList() {

    /**
    
    // (dev)Loading 상태를 확인하기 위한 쓰로틀링
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);   
    });
    
    */
    
    
    let resultData = []; // 반환 값 초기화

    // 요청 url
    const REQ_URL = `${BASE_API_URL}/${TID}/items`;

    const response = await fetch(REQ_URL, {
        method: 'GET',
        cache: 'no-store',
    });

    try {

    } catch(e) {
        console.log(e);
    }

    // response가 ok인 경우 반환 값 데이터 설정
    if (!response?.ok) {
        throw new Error('Network error');
    } else {
        const resJson = await response.json();
        resultData  = resJson ? resJson : [];
    }

    // 결과를 return 한다
    return resultData;
}


export default MainPage;