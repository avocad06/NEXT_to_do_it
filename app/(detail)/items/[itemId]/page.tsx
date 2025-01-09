/**
 * 할 일 상세 목록 페이지
 */

import { validateId } from "../../../utils/validateId";


/**
 * NextJS 15부터는 params API 가 비동기로 변경되어 type Promise를 반환
 */
async function ItemPage({ params:iParams } : { params: Promise<{ itemId: string; }> }) {
    const { itemId } = await iParams;

    
    // id의 유효성 검사(없는 경우)
    if (!itemId) {
        throw new Error('itemId required');
    }


    // id의 유효성 검사(타입이 적합하지 않은 경우)
    validateId(itemId);

    return (<>Detail item router {itemId}</>)
}

export default ItemPage;