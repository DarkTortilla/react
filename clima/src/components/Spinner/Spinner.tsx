import styles from './Spiner.module.css'

export default function Spinner() {
    return (
        <div className={styles.sk_folding_cube}>
            <div className={`${styles.sk_cube1} ${styles.sk_cube}`}></div>
            <div className={`${styles.sk_cube2} ${styles.sk_cube}`}></div>
            <div className={`${styles.sk_cube4} ${styles.sk_cube}`}></div>
            <div className={`${styles.sk_cube3} ${styles.sk_cube}`}></div>
        </div>
    )
}
