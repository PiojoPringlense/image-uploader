import styles from "../styles/Progress.module.css";

const Progress = ({ progress }) => {
	return (
		<>
			<h1 className={styles.title}>Uploading...</h1>
			<div className={styles.progressContainer}>
				<div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
			</div>
		</>
	);
};
export default Progress;
