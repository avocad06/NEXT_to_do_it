import Image from "next/image";
import empty_done from '../../../public/assets/no_done.png';
import empty_done_m from '../../../public/assets/no_done_m.png';
import empty_todo from '../../../public/assets/no_todo.png';
import empty_todo_m from '../../../public/assets/no_todo_m.png';
import styles from './style.module.css';

function NoItem({isCompleted} : { isCompleted: boolean; }) {
    const imgSrc   = {
        large: isCompleted === true ? empty_done : empty_todo,
        small: isCompleted === true ? empty_done_m : empty_todo_m
    };

    const noTodoGuide = (
        <>
            <p>할 일이 없어요.</p>
            <p>TODO를 새롭게 추가해주세요!</p>
        </>
        );

    const noDoneGuide = (
        <>
            <p>아직 다 한 일이 없어요.</p>
            <p>해야 할 일을 체크해보세요!</p>
        </>
        );
    

    return (
        <div className={styles.no_item}>
            <div className={styles.img_wrap}>
                <Image src={imgSrc.large} alt={"내용 없음 이미지"} className={`g_pc ${styles.img_src}`}/>
                <Image src={imgSrc.small} alt={"내용 없음 이미지_모바일"} className={`g_mobile ${styles.img_src}`}/>
            </div>
            {isCompleted ? noDoneGuide : noTodoGuide}
        </div>

    )
}

export default NoItem;