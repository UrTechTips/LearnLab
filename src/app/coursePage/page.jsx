"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./course.module.scss";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { app } from "@/config/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const fileData = ["README.md", "index.js", "styles.module.scss", "components/FileList.jsx", "public/logo.png"];

const CoursePage = () => {
	const router = useRouter();
	const db = getFirestore();
	const storage = getStorage(app);
	const [data, setData] = useState({});
	const [files, setFiles] = useState([]);
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	useEffect(() => {
		async function getDocumentById(documentId) {
			try {
				const docRef = doc(db, "courses", documentId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setData(docSnap.data());
					const listRef = ref(storage, docSnap.data().name);
					const res = await listAll(listRef);

					const filePromises = res.items.map(async (itemRef) => {
						const url = await getDownloadURL(itemRef);
						const path = itemRef.fullPath;
						return {
							name: itemRef.name,
							url,
							path,
						};
					});

					const fileDetails = await Promise.all(filePromises);
					setFiles(fileDetails);
				} else {
					console.log("No such document!");
				}
			} catch (error) {
				console.error("Error getting document:", error);
			}
		}

		getDocumentById(id);
	}, [id]);

	const handleClick = (file) => {
		router.push(`/view?courseName=${searchParams.get("name")}&path=${file.path}`);
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>{searchParams.get("name")}</h2>
			<ul className={styles.fileList}>
				{files.map((file, index) => (
					<li key={index} className={styles.fileItem} onClick={() => handleClick(file)}>
						<div className={styles.file}>
							<h6>{file.name}</h6>
							<p>F</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CoursePage;
