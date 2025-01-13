"use client";

/** typs */
import type { TodoInline } from '../../../(main)/page'
import type { FormStatus } from '../editform'

/** static */
import NonCheckIcon from '../../icons/todo_check.svg';
import CheckIcon from '../../icons/done_check.svg';
import styles from './style.module.css';


/** lib */
import { useRef, useState, useEffect } from 'react';

type HeaderProps = {
    data: TodoInline;
    handleStatus: (status: FormStatus) => void;
}

/** 상세 항목 페이지 수정 가능한 TODO 컴포넌트 */
function EditHeader(props: HeaderProps) {

    // 체크 버튼 핸들러
    const [ checked, setChecked ] = useState(props?.data?.isCompleted);
    
    // 입력 값
    const [ inputValue, setInputValue ] = useState(props?.data?.name); // 입력 값

    // view/edit mode
    const [ isEditMode, setIsEditMode ] = useState(false);

    // autoFocusing
    const inputRef = useRef(null);

    useEffect(() => {
        if ( isEditMode) {
            inputRef.current.focus();
        }
    }, [ isEditMode ]);

    /**
     * 버튼 활성화 여부 감지하는 함수
     */

    const handleChange = (e) => {
        const { target } = e;
        setInputValue(target.value);
        props?.handleStatus(target.value);
    }

    const { id=undefined, name='', isCompleted=false } = props?.data;
    
    const completeCheck = checked ? <CheckIcon /> : <NonCheckIcon />

    // id 값이 없으면 return 하기
    if ( !id ) { return; }

    return (
        <div className={styles.edit_header}>
            <div className={styles.input_wrap}>
                <label className={styles.check_btn}>
                    <input 
                        type={"checkbox"} 
                        name={"isCompleted"} 
                        checked={checked}
                        value={"completed"}
                        className={styles.check_input} 
                        onChange={() => setChecked(!checked)}
                    />
                    {completeCheck}
                </label> 
                <div className={`${styles.content} ${isEditMode ? styles.edit : ''}`} onClick={() => {
                    inputRef.current.focus();
                    setIsEditMode(true); }}>
                    <span className={styles.text}>{inputValue}</span>
                    <input
                        className={`${styles.input}`}
                        value={inputValue}
                        name={"name"}
                        onChange={handleChange} 
                        onBlur={() => {
                            setIsEditMode(false)
                        }}
                        ref={inputRef}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditHeader;