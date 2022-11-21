import Head from "next/head";
import Image from "next/image";
import Upload from "../components/Upload";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import Progress from "../components/Progress";
import Completed from "../components/Completed";

export default function Home() {
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [imageUrl, setImageUrl] = useState("");

	async function uploadFile(formData) {
		setIsUploading(true);
		const config = {
			onUploadProgress: (event) => {
				setUploadProgress(Math.round((event.loaded * 100) / event.total));
			},
		};

		const response = await axios.post("/api/images", formData, config);
		console.log(response);
		if (response.status === 200) {
			setIsUploading(false);
			setIsUploaded(true);
			setImageUrl(response.data.data);
		} else {
			setIsUploading(false);
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Image uploader" />
				<link rel="icon" href="/devchallenges.png" />
				<title>Image uploader</title>
			</Head>
			<main className={styles.main}>
				<div className={styles.cardContainer}>
					{!isUploading && !isUploaded && <Upload uploadFile={uploadFile} />}
					{isUploading && <Progress progress={uploadProgress} />}
					{isUploaded && <Completed imageUrl={imageUrl} />}
					{/* <Completed imageUrl={imageUrl} /> */}
				</div>
			</main>
			<footer className={styles.footer}>
				<p>
					created by <span>PiojoPringlense</span> - devChallenges.io
				</p>
			</footer>
		</div>
	);
}
