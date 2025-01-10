import styles  from './style.module.css';

function AddBar() {
    return (
        <div className={styles.header}>
            <div>검색 바</div>
            <button>추가하기</button>
        </div>
    )
}

export default AddBar;