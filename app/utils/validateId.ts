/**
 * id 값의 유효성을 검사하는 함수
 * @param id 
 */

export function validateId(id: unknown): void {
    if (typeof id !== 'string' || isNaN(Number(id))) {
        throw new Error('invalid id');
    }
}
