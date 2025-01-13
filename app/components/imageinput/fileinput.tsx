"use client";

import { useState } from 'react';
import NoImgIcn from '../icons/no_img.svg';
import PlusIcn from '../icons/plus_icon_dark.svg'
import WriteIcn from '../icons/edit_icon.svg'
import styles from './style.module.css';
import Image from 'next/image';
import { validateFile } from '../../utils/validatefiles';

function FileInput(props: { url: string; }) {

    // 미리보기 이미지
    const [ preview, setPreview ] = useState({
        src: props?.url,
        name: '사용자가 업로드한 이미지',
    });

    const handleChange = (e) => {
        // input 을 가져온다
        const file = e.target?.files?.[0];

        const { isValid: fileValid, errMsg } = validateFile(file);

        // 이미지 유효성 검사
        if ( !fileValid ) {
            alert(errMsg);
            return;
        }
        
        // url 을 만든다
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview({
            src: reader.result as string,
            name: file.name,
          });
        };
        
        if (file) {
          reader.readAsDataURL(file);
        }

    }


    // 이미지가 있는 경우
    if (preview?.src) {
        return (
            <div className={`${styles.input_wrap} ${styles.is_src}`}>
                <Image src={ preview?.src } alt={ preview?.name } className={styles.input_src} fill={true} />
                <label htmlFor={'file'} className={styles.input_trigger}>
                    <input 
                        id={'file'}
                        className={styles.input}
                        type={"file"}
                        onChange={handleChange}
                        name={"imageUrl"}
                        accept={'.jpg, .jpeg, .png'}
                    />
                    <WriteIcn />
                </label>
            </div>
        )
        
        // 이미지가 없는 경우
    } else {

        return (
            <div className={styles.input_wrap}>
                <NoImgIcn />
                <label htmlFor={'file'} className={styles.input_trigger}>
                    <input 
                        id={'file'}
                        className={styles.input}
                        type={"file"}
                        onChange={handleChange}
                        accept={'.jpg, .jpeg, .png'}
                    />
                    <PlusIcn />
                </label>
            </div>
        )
    }

}

export default FileInput