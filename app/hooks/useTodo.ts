import { useState } from "react";
import { TodoService } from "../services/todoservice";
import type { ITodoItem } from '../types/types'

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
    async function addTodo() {
        try {
            const data = await TodoService.addTodo();
            setTodo(data);
        } catch(err: any) {
            setError(err.message);
        }
    }


    // todo 상태, todo 추가, todo 수정, todo 삭제 함수 내보내기
    return { todo, fetchTodo };
}

