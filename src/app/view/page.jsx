"use client";
import DocViewer from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { getBlob, getStorage, ref } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./view.module.scss";
import Timer from "@/components/timer/timer.component";

const View = () => {
	const router = useRouter();
	const storage = getStorage();
	const searchParams = useSearchParams();
	const path = searchParams.get("path");
	const courseName = searchParams.get("courseName");
	const [blob, setBlob] = useState(null);
	const [name, setName] = useState("");

	useEffect(() => {
		const storageRef = ref(storage, path);
		getBlob(storageRef)
			.then((blob) => {
				setName(storageRef.name);
				setBlob(blob);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [path]);

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Timer name={name} courseName={courseName} />
			</div>
			<div className={styles.right}>{blob && <DocViewer documents={[{ uri: window.URL.createObjectURL(blob), fileName: name }]} />}</div>
		</div>
	);
};

export default View;
