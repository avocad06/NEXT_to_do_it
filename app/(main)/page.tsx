import AddBar from "../components/addbar/addbar";
import CheckList from "../components/checklist/checklist";
import { BASE_API_URL } from "../constants/consts";
import { square } from "../styles/fonts";
import type { ITodoItem } from '../types/types'
import styles from './style.module.css';

export type TodoInline = Pick<ITodoItem, "id" | "name" | "isCompleted">

async function MainPage() {

    const todoData = await getTodoList();
    
    return (
        <main className={`g_main ${square.variable}`}>
            <div className={"g_wrapper"}>
                {/* 할 일 추가 input */}
                <AddBar />

                <div className={styles.card_wrap}>
                    {/* 진행 중인 할 일 */}
                    <CheckList
                        isCompleted={false}
                        content={todoData?.filter((item) => item.isCompleted === false) ?? []}
                    />
                    {/* 완료된 할 일 */}
                    <CheckList
                        isCompleted={true}
                        content={todoData?.filter((item) => item.isCompleted === true) ?? []}
                    />
                </div>

            </div>
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
    const REQ_URL = `${BASE_API_URL}/avo/items`;

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
        resultData  = resJson ? resJson : [];
    }

    // 결과를 return 한다
    return resultData;
}


export default MainPage;