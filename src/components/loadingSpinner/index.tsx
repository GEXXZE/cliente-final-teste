import styles from './style.module.css'

export default function LoadingSpinner() {
    return (
        <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
        </div>
    )
}