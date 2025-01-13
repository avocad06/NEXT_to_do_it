"use client";

/** typs */
import type { TodoInline } from '../../../(main)/page'
import type { ITodoItem } from '../../../types/types'

/** static */
import { BASE_API_URL } from '../../../constants/consts';
import NonCheckIcon from '../../icons/todo_check.svg';
import CheckIcon from '../../icons/done_check.svg';
import styles  from './style.module.css';

/** libs */
import Link from 'next/link';
import { useRouter } from 'next/navigation';




function ListItem(props : TodoInline) {
    
    const { id=undefined, name='', isCompleted=false } = props;
    
    const completeCheck = isCompleted ? <CheckIcon /> : <NonCheckIcon />
    const itemClass = isCompleted? styles.complete : '';
    // const itemClass = isCompleted? '' : styles.complete;

    // id 값이 없으면 return 하기
    if ( !id ) { return; }

    const linkUrl = `/items/${id}`
    const router = useRouter();

    /**
     * 서버에 POST 요청
     */

    const editTodoData = async(id: number, editData : Partial<ITodoItem>) => {
        
        // id 유효성 검사
        if (typeof id !== 'number' || id <= 0) { 
            throw new Error('Invalid ID'); 
        }

        
        // data fetch
        const REQ_URL = `${BASE_API_URL}/avo/items/${id}`;
        const res = await fetch(REQ_URL, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify(editData),
        });

        
        // network error
        if (!res?.ok) {
            console.log('error 발생');
            alert('할 일 업데이트 중 문제가 발생하였습니다. 다시 시도해 주세요.');
            return;
        }

        // success
        router.replace('/');
    }

    /**
     * 할 일 check 버튼 눌렀을 때 실행되는 함수
     */
    const handleClick = (e) => {

        // 상세 항목으로 넘어가지 않도록 이벤트 기본 동작 막기
        e.preventDefault();
        e.currentTarget.disabled = true;

        // edit 데이터 가공
        const todoData = {
            isCompleted: !isCompleted,
        }

        // edit 할 데이터 전달
        editTodoData( id, todoData );
    }
    
    return (
        <li className={`${styles.item} ${itemClass}`}>
            <Link href={linkUrl} className={styles.link}>
                <div className={styles.content_wrap}>
                    <button className={styles.check_btn} onClick={handleClick}>
                        {completeCheck}
                    </button>
                    <span className={styles.content}>{name}</span>                
                </div>
            </Link>
        </li>
    )
}

export default ListItem;