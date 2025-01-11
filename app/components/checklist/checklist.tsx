import ListItem from './listitem/listitem';
import styles  from './style.module.css';
import type { TodoInline } from '../../(main)/page' 
import NoItem from './noitem';
import Image from 'next/image';
import todoTitlePic from '../../../public/assets/todo_title.png'
import doneTitlePic from '../../../public/assets/done_title.png'


type CheckListProps = {
    isCompleted: boolean;
    content? : TodoInline[];
}

function CheckList(props : CheckListProps) {

    const imgSrc = {
        src: props?.isCompleted === true ? doneTitlePic : todoTitlePic,
        alt: props?.isCompleted === true ? '완료된 일' : '할 일',
    }


    return (
        <article className={styles.check_list}>
            
            {/* section title( TO DO / DONE ) */}
            <div className={styles.img_wrap}>
                <Image src={imgSrc.src} alt={imgSrc.alt} className={styles.img_src} />
            </div>

            {/* list section */}
            { props?.content?.length === 0 && (<NoItem isCompleted={props?.isCompleted} />)}
            { props?.content?.length !== 0 && (    
                <ul className={styles.list}>
                    { props?.content?.map((item) => (
                        <ListItem 
                            key={item.id} 
                            id={item?.id} 
                            name={item.name} 
                            isCompleted={item.isCompleted}  /> 
                        )) }
                </ul>
            )}
        </article>
    )
}

export default CheckList;