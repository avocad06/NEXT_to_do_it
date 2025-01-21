import { BASE_API_URL } from "../constants/consts";

// api/client.ts
async function apiRequest<T>(config: { url: string, method: 'GET'|'POST'|'PUT'|'DELETE', data?: any, options?: any }): Promise<T> {
	
    const requestConfig = {
        method: config?.method,
        body: config?.data,
        ...config?.options,
    }

    const requestURL = BASE_API_URL + config?.url;
    
    const response = await fetch(requestURL, requestConfig);
    
    // response가 ok인 경우 반환 값 데이터 설정
    if (!response?.ok) {
        throw new Error('Network error');
    } else {
        const resJson = await response.json();
        return resJson;
    }
}

export { apiRequest };