"use client";
import Timer from "@/components/timer/timer.component";
import DocViewer from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { getBlob, getStorage, ref } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./view.module.scss";

const View = () => {
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
			<div className={styles.right}>
				{blob && (
					<DocViewer
						style={{ width: "100%", height: "40rem", overflowY: "scroll" }}
						documents={[{ uri: window.URL.createObjectURL(blob), fileName: name }]}
						config={{
							pdfVerticalScrollByDefault: true,
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default View;
