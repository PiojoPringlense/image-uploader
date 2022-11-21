import { useRef } from "react";
import styles from "../styles/Completed.module.css";

const Completed = ({ imageUrl }) => {
	const imageRef = useRef();

	function copyUrl() {
		navigator.clipboard.writeText(imageRef.current.currentSrc);
		alert("Image link copied to clipboard");
	}

	return (
		<>
			<img src="./check.svg" alt="Uploaded Successfully!" />
			<h1 className={styles.title}>Uploaded Successfully!</h1>
			<img ref={imageRef} className={styles.imageUploaded} src={imageUrl} alt="" />
			<div className={styles.url}>
				<p className={styles.link}>{imageRef.current.currentSrc}</p>
				<button onClick={copyUrl} className={styles.btn}>
					Copy Link
				</button>
			</div>
		</>
	);
};
export default Completed;
