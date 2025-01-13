/**
 * 할 일 상세 목록 페이지
 */

import { validateId } from "../../../utils/validateId";

/** components */
import ListItem from '../../../components/checklist/listitem/listitem'
import FileInput from "../../../components/imageinput/fileinput";

import { BASE_API_URL } from "../../../constants/consts";

import type { ITodoItem } from "../../../types/types";
import EditForm from "../../../components/editform/editform";


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


    const todoData = await getTodoItem(itemId);

    return (
        <main className={'g_main'}>
            <div className={'g_wrapper'}>
                <EditForm todoData={todoData} />
            </div>
        </main>
    )
}

export default ItemPage;


/**
 * data를 fecthing 하는 함수
 * @description 이 함수는 컴포넌트 안에 있을 필요 없습니다
 */

    async function getTodoItem(itemId): Promise<null | ITodoItem> {

    /**
    
    // (dev)Loading 상태를 확인하기 위한 쓰로틀링
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);   
    });
    
    */
    
    
    let resultData = null; // 반환 값 초기화

    // 요청 url
    const REQ_URL = `${BASE_API_URL}/avo/items/${itemId}`;

    const response = await fetch(REQ_URL, {
        method: 'GET',
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
        resultData  = resJson ? resJson : null;
    }

    // 결과를 return 한다
    return resultData;
}