"use client";
import React, { useState } from "react";
import styles from "./newCourse.module.scss";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app, auth } from "@/config/firebaseConfig";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

const NewCourse = () => {
	const router = useRouter();
	const user = auth.currentUser;
	const storage = getStorage(app);
	const db = getFirestore();
	const [name, setName] = useState("");
	const [files, setFiles] = useState([]);
	const [error, setError] = useState("");

	const handleFileChange = (event) => {
		setFiles([...event.target.files]);
	};

	const handleUpload = async () => {
		files.forEach((file, index) => {
			const reader = new FileReader();

			reader.onload = (e) => {
				const blob = new Blob([e.target.result], { type: file.type });
				const filePath = `${name}/${file.name}`;
				const storageRef = ref(storage, filePath);

				console.log(`Uploading file #${index + 1}: ${file.name}`);

				uploadBytes(storageRef, blob)
					.then(() => {
						console.log(`${file.name} uploaded successfully`);
					})
					.catch((err) => {
						setError(err);
						console.error(`Failed to upload ${file.name}:`, err);
					});
			};

			reader.readAsArrayBuffer(file);
		});
		await addDoc(collection(db, "courses"), {
			name: name,
			by: user.uid,
			mentor: {
				name: user.displayName,
				email: user.email,
			},
		})
			.then((snapshot) => {
				console.log("Course Created");
				router.push("/dashboard");
			})
			.catch((err) => {
				setError(err);
				router.refresh();
			});
	};

	return (
		<>
			<main className={`d-flex align-items-center justify-content-center ${styles.container}`}>
				<div className={styles.formContainer}>
					<h1 className="h2 mb-3 fw-normal text-center">Welcome, Mentor!</h1>
					<h4 className="text-center">Hope you&#39;re having a good day.</h4>

					<div className="form-floating mb-3">
						<input type="text" className={`form-control `} id="courseName" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} />
						<label className={styles.courseLabel} for="courseName">
							Course Name
						</label>
					</div>

					<div className="mb-3">
						<label for="formFile" className="form-label">
							Upload educational resources (any file type)
						</label>
						<input className={`form-control`} type="file" id="formFile" multiple onChange={handleFileChange} />
					</div>
					{error}
					<button className="btn btn-primary w-100 py-2 mb-3" type="button" onClick={handleUpload}>
						Upload Files
					</button>
				</div>
			</main>
		</>
	);
};

export default NewCourse;
