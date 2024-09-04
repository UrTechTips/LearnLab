"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./course.module.scss";
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { app, auth } from "@/config/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const fileData = ["README.md", "index.js", "styles.module.scss", "components/FileList.jsx", "public/logo.png"];

const CoursePage = () => {
	const user = auth.currentUser;
	const router = useRouter();
	const db = getFirestore();
	const storage = getStorage(app);
	const [userData, setUserData] = useState({});
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
				if (user) {
					const userDoc = doc(db, "users", user.uid);
					const userSnapshot = await getDoc(userDoc);
					const data = userSnapshot.data().courses;

					setUserData(data.find((d) => d.name === searchParams.get("name")));
				}
			} catch (error) {
				console.error("Error getting document:", error);
			}
		}

		getDocumentById(id);
	}, [id, user]);

	const handleClick = (file) => {
		router.push(`/view?courseName=${searchParams.get("name")}&path=${file.path}`);
	};

	const formatTime = (seconds) => {
		if (seconds < 60) {
			return `${seconds}s`;
		} else if (seconds < 3600) {
			const minutes = Math.floor(seconds / 60);
			return `${minutes}m`;
		} else {
			const hours = Math.floor(seconds / 3600);
			return `${hours}h`;
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>{searchParams.get("name")}</h2>
			<div className={styles.info}>
				<div>
					<h6>
						By: <strong>{data.mentor?.name}</strong>
					</h6>
					<h6>
						Email: <strong>{data.mentor?.email}</strong>
					</h6>
				</div>
				<div>
					<h5>Studied For: {formatTime(userData?.time)}</h5>
				</div>
			</div>
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
