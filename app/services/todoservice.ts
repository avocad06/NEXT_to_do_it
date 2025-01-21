import { apiRequest } from "../api/client"
import { TID } from "../constants/consts";

// services/todoservice.ts
export const TodoService = {
    async fetchTodo() {
        const responseData = await apiRequest({ url: `/${TID}/items`, method: 'GET',});

        // 에러인 경우
        if ( !apiRequest ) {
            throw new Error('request error');
        }

        return responseData;

    },
    async addTodo() {
        const responseData = await apiRequest({ url: '', method: 'GET',});

        // 에러인 경우
        if ( !apiRequest ) {
            throw new Error('request error');
        }

        return responseData;

    }
}