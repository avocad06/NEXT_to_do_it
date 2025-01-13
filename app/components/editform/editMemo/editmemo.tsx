import styles from './style.module.css';

function EditMemo(props: { memo: string; }) {
    return (
        <div className={styles.container}>
            <div>
                <span className={styles.title}>Memo</span>
            </div>
            <textarea className={styles.content} name={"memo"} defaultValue={props?.memo}></textarea>
        </div>
    )
}

export default EditMemo;