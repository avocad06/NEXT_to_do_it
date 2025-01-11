"use client";

import styles  from './style.module.css';
import PlusIcn from '../icons/plus_icon.svg';
import Button from '../button/button';
import { useState } from 'react';
import { BASE_API_URL } from '../../constants/consts';
import { useRouter } from 'next/navigation';

function AddBar() {

    const [ inputValue, setInputValue ] = useState(''); // 입력 값
    const [ status, setStatus ] = useState<string | 'empty' | 'typing' | 'submitting'>('empty'); // input 유효성 상태

    const router = useRouter();

    /**
     * 서버에 POST 요청
     */

    const postTodoData = async(formData) => {
        
        // data fetch
        const postData = Object.fromEntries(formData);

        const REQ_URL = `${BASE_API_URL}/avo/items`;
        const res = await fetch(REQ_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(postData),
        });

        if (!res?.ok) {
            console.log('error 발생');
            alert('할 일 추가 중 문제가 발생하였습니다. 다시 시도해 주세요.');
            setStatus('typing');
            return;
        } 

        setInputValue('');
        router.replace('/');
    }
    

    /**
     * 버튼 활성화 여부 감지하는 함수
     */

    const handleChange = (e) => {

        let input_status = 'empty';
        const { target } = e;
        setInputValue(target.value);
        
        
        // 빈 값이 아니면 typing 상태로 변경
        if ( typeof(target.value) === 'string' && target.value?.trim().length !== 0 ) {
            input_status = 'typing';
        }

        setStatus(input_status);
    }

    
    /**
     * 추가하기 버튼을 누르면 실행될 함수
     */
    const handleAddTodo = (e) => {
        e.preventDefault(); // 폼 제출을 막기 위해 사용
        
        if ( typeof(inputValue) === 'string' && inputValue?.trim().length !== 0 ) {
            // 빈 값이 아니면 submitting 상태로 변경
            setStatus('submitting');
            postTodoData(new FormData(e.currentTarget));
        }
        
    }




    
    return (
        <form onSubmit={handleAddTodo}>
            <div className={`${styles.addBar}`}>
                    <div className={`g_border ${styles.inputBar}`}>
                        <input 
                            name={'name'} 
                            className={styles.addInput} 
                            placeholder={'할 일을 입력해주세요'}
                            value={inputValue}
                            onChange={handleChange}
                        />
                    </div>
                    <Button 
                        type='submit'
                        content={'추가하기'}
                        disabled={status !== 'typing'}
                        icon={<PlusIcn/>}
                        button_class={`g_border g_btn ${status === 'typing' ? 'add' : ''}`}
                        content_class={'g_pc'}
                    />
            </div>
        </form>

    )
}

export default AddBar;
