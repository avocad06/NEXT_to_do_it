import { useState } from "react";
import { TodoService } from "../services/todoservice";

export function useTodo(initData: any) {
    const [ todo, setTodo   ] = useState<any | null>(initData);
    const [ error, setError ] = useState(null);

    // fetch 
    async function fetchTodo() {
        try {
            const data = await TodoService.fetchTodo();
            setTodo(data);
        } catch(err: any) {
            setError(err.message);
        }
    }

    // todo add
    async function addTodo(inputData) {
        try {
            const resData = await TodoService.addTodo(inputData);

            if (!resData) {
                console.log('error 발생');
                alert('할 일 추가 중 문제가 발생하였습니다. 다시 시도해 주세요.');
                return null;
            }
        } catch(err: any) {
            setError(err.message);
        }
    }


    // todo 상태, todo 추가, todo 수정, todo 삭제 함수 내보내기
    return { todo, fetchTodo, addTodo };
}

