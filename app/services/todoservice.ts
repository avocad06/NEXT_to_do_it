import { apiRequest } from "../api/client"
import { BASE_API_URL } from "../constants/consts";

// services/todoservice.ts
const todoService = {
    async fetchTodo() {
        const responseData = await apiRequest({ url: '', method: 'GET',});

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