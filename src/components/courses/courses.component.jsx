"use client";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styles from "./courses.module.scss";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebaseConfig";

const Courses = ({ top }) => {
	const user = auth.currentUser;
	const router = useRouter();
	const db = getFirestore();
	const [courses, setCourses] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const run = async () => {
			const querySnapshot = await getDocs(collection(db, "courses"));
			if (user) {
				const userDoc = doc(db, "users", user.uid);
				const userSnapshot = await getDoc(userDoc);
				const data = userSnapshot.data()?.courses;
				setData(data);
			}
			const coursesArray = [];
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
				const newData = { id: doc.id, ...doc.data() };
				coursesArray.push(newData);
			});

			if (top) {
				setCourses(coursesArray.slice(0, 3));
			} else {
				setCourses(coursesArray);
			}
		};
		run();
	}, [user]);

	const handleView = (course) => {
		router.push(`/coursePage?id=${course.id}&name=${course.name}`);
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
		<>
			<div className={styles.container}>
				<div className={`row ${styles.cards}`}>
					{courses.map((course, index) => (
						<div key={index} className="col-md-6 col-lg-4">
							<div className={`card mb-4 ${styles.card}`}>
								<div className="card-body">
									<h5 className="card-title">{course.name}</h5>
									<p className="card-text">{course.mentor.name}</p>
									<div className={styles.buttonInfo}>
										<button className="btn btn-primary" onClick={() => handleView(course)}>
											View
										</button>
										{data?.find((d) => d.name === course.name) ? <h6>Studied for {formatTime(data.find((d) => d.name === course.name)?.time)}</h6> : <></>}
									</div>
									{/* <button className="btn btn-outline-secondary">Delete</button> */}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Courses;
