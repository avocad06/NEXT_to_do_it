import styles  from './style.module.css';

function ListItem() {
    return (
        <li className={styles.item}>
            <div>체크 상태</div>
            <div>할 일 내용</div>
        </li>
    )
}

export default ListItem;