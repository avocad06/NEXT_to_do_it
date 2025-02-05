import { apiRequest } from "../api/client"
import { TID } from "../constants/consts";

// services/todoservice.ts
export const TodoService = {
    async fetchTodo<T>(): Promise<T> {
        const responseData = await apiRequest({ url: `/${TID}/items`, method: 'GET',});

        // 에러인 경우
        if ( !responseData ) {
            throw new Error('request error');
        }

        return responseData as T;
    },
    async addTodo<T>(data: T):Promise<any>  {
        const responseData = await apiRequest({ url: `/${TID}/items`, method: 'POST', data: JSON.stringify(data), options: {
            headers: {
                "Content-Type": "application/json",
              },
        }});

        // 에러인 경우
        if ( !responseData ) {
            throw new Error('request error');
        }

        return responseData;
    }
}