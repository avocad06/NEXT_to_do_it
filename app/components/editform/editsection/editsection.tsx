import styles from './style.module.css';

function EditSection({ children }) {
    return (
        <div className={styles.section}>
            { children }
        </div>
    )
}

export default EditSection;