import { useState } from "react";
import styles from "../styles/Upload.module.css";

const Upload = ({ uploadFile }) => {
	const [isDraging, setIsDraging] = useState(false);

	function handleFileInput(e) {
		const formData = new FormData();
		formData.append("theFiles", e.target.files[0]);

		uploadFile(formData);
	}

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraging(false);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraging(true);

		e.dataTransfer.dropEffect = "copy";
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraging(false);

		const formData = new FormData();
		formData.append("theFiles", e.dataTransfer.files[0]);

		uploadFile(formData);
	};

	return (
		<>
			<h1 className={styles.title}>Upload your image</h1>
			<p className={styles.subtitle}>File should be Jpeg, Png,...</p>
			<div
				onDrop={(e) => handleDrop(e)}
				onDragEnter={(e) => handleDragEnter(e)}
				onDragOver={(e) => handleDragOver(e)}
				onDragLeave={(e) => handleDragLeave(e)}
				className={`${styles.dropZone} ${isDraging ? styles.draging : ""}`}>
				<img src="./image.svg" alt="Drag & Drop your image here" />
				<p className={styles.text}>Drag & Drop your image here</p>
			</div>
			<p className={styles.text}>Or</p>
			<input
				onChange={handleFileInput}
				type="file"
				name="theFiles"
				id="file"
				hidden
				accept="image/*"
			/>
			<label className={styles.btn} htmlFor="file">
				Choose a file
			</label>
		</>
	);
};
export default Upload;
