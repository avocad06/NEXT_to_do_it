"use client";

import styles  from './style.module.css';
import type { TodoInline } from '../../../(main)/page'
import NonCheckIcon from '../../icons/todo_check.svg';
import CheckIcon from '../../icons/done_check.svg';
import Link from 'next/link';

function ListItem(props : TodoInline) {
    const { id=undefined, name='', isCompleted=false } = props;
    const completeCheck = isCompleted ? <CheckIcon /> : <NonCheckIcon />
    const itemClass = isCompleted? styles.complete : '';
    // const itemClass = isCompleted? '' : styles.complete;

    // id 값이 없으면 return 하기
    if ( !id ) { return; }

    const linkUrl = `/items/${id}`
    
    return (
        <li className={`${styles.item} ${itemClass}`}>
            <Link href={linkUrl} className={styles.link}>
                <div className={styles.content_wrap}>
                    <button className={styles.check_btn}>
                        {completeCheck}
                    </button>
                    <span className={styles.content}>{props?.name}</span>                
                </div>
            </Link>
        </li>
    )
}

export default ListItem;