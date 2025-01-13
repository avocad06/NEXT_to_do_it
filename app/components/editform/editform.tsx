"use client";

import FileInput from "../imageinput/fileinput";
import EditHeader from "./editheader/editheader";
import Button from "../button/button";
import EditIcn from '../icons/check_‭icon.svg';
import DeleteIcn from '../icons/x_icon.svg';
import EditMemo from "./editMemo/editmemo";
import EditSection from "./editsection/editsection";

import styles from './style.module.css';
import { BASE_API_URL } from "../../constants/consts";

import type { ITodoItem } from "../../types/types";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateFile } from "../../utils/validatefiles";

export type FormStatus = string | 'empty' | 'typing' | 'submitting';

function EditForm(props: { todoData: ITodoItem }) {

    const { id, name, isCompleted, memo, imageUrl } = props?.todoData; // prop으로 전달할 변수들
    
    // status 초기값
    const initStatus = name?.length !== 0 ? 'typing' : 'empty';

    // input 핸들러
    const [ status, setStatus ] = useState<FormStatus>(initStatus); // input 유효성 상태

    const router = useRouter();

    
    /**
     * 서버에 POST 요청
     */

      

    const postTodoData = async(formData) => {
        
        // data fetch
        const postData = Object.fromEntries(formData);


        // 체크박스 값 가공
        const checkboxValue = formData?.has('isCompleted') ? true : false;
        postData.isCompleted = checkboxValue;
    
        
        // 이미지 url post
        const formImg = formData.get('imageUrl');

        // formImg 가 유효한지 검사
        const { isValid : formImgValid } = validateFile(formImg);

      
        async function postRequest(url, method, data, headers=undefined) {
          const response = await fetch(url, {
            method,
            body: data,
            headers : headers ? headers : undefined,
          });
      
          if (!response.ok) {
            throw new Error(`${url} 요청 실패`);
          }
      
          return response.json();
        }
      
        try {
          let imgUrl = null;

          // 이미지가 유효한 경우
          if (formImgValid) {
            const imgFormData = new FormData();
            imgFormData.set('image', formImg);
            imgUrl = await postRequest(`${BASE_API_URL}/avo/images/upload`, 'POST', imgFormData);
          } else {
          }
          

          // 이미지가 없거나, POST 후 업로드된 이미지의 url 이 있을 때
          if (!formImgValid || (imgUrl && imgUrl?.url)) {
            postData.imageUrl = imgUrl?.url;
            const result = await postRequest(`${BASE_API_URL}/avo/items/${id}`, 'PATCH', JSON.stringify(postData), {"Content-Type": "application/json",});


            // 성공인 경우
            if (result?.id) {
                setStatus('typing');
                router.push('/');
            } 
          } else {
          }
      
        } catch (error) {
          console.error('할 일 수정 중 오류 발생:', error);
          alert('할 일을 업데이트하는 중 문제가 발생하였습니다. 다시 시도해 주세요.');
        }
    }

    const deleteTodoData = async(): Promise<void> => {
      const delConfirm = confirm('삭제하시겠습니까?');

      if ( !delConfirm ) {
        return;
      }
      const REQ_URL = `${BASE_API_URL}/avo/items/${id}`;
      const response = await fetch(REQ_URL, {
        method : 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`${REQ_URL} 요청 실패`);
      }
  
      const result = await response.json();

      if (result?.message) {
        setStatus('typing');
        alert('할 일이 삭제되었습니다.');
        router.push('/');
      }
    }


    // status 핸들러
    const handleStatus = ( value: string ) => {
        let input_status = 'empty';        
        
        // 빈 값이 아니면 typing 상태로 변경
        if ( typeof(value) === 'string' && value?.trim().length !== 0 ) {
            input_status = 'typing';
        }

        setStatus(input_status);
    }


    /**
     * 수정하기 버튼을 누르면 실행될 함수
     */
    const handleEditTodo = (e) => {
        e.preventDefault(); // 폼 제출을 막기 위해 사용
        
        // 빈 값이 아니면 submitting 상태로 변경
        if ( status === 'typing' ) {
            setStatus('submitting');
        };

        // post data
        const postData = new FormData(e.currentTarget);

        // formData 확인하는 코드
        // for (const [key, value] of postData.entries()) { console.log(`${key}: ${value}`); }

        postTodoData(postData);
    }

    return (
        <form onSubmit={handleEditTodo}>
            <div className={styles.content_wrap}>
                <EditHeader data={{ id, name, isCompleted}} handleStatus={handleStatus} />
                <div className={styles.section_wrap}>
                    <EditSection>
                        <FileInput url={imageUrl} />
                    </EditSection>
                    <EditSection>
                        <EditMemo memo={memo} />
                    </EditSection>
                </div>
                
                
                {/* 버튼 */}
                <div className={styles.btn_wrap}>
                    <Button 
                        type='submit'
                        content={'수정 완료'}
                        disabled={status !== 'typing'}
                        icon={<EditIcn />}
                        button_class={`g_border g_btn ${status === 'typing' ? 'modify' : ''}`}
                        content_class={''}
                    />
                    <Button 
                        type='button'
                        content={'삭제하기'}
                        disabled={status !== 'typing'}
                        icon={<DeleteIcn />}
                        button_class={`g_border g_btn delete`}
                        content_class={''}
                        onClick={deleteTodoData}
                    />
                </div>

            </div>
        </form>
    )
}

export default EditForm;