"use client";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styles from "./courses.module.scss";
import { useRouter } from "next/navigation";

const Courses = () => {
	const router = useRouter();
	const db = getFirestore();
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const run = async () => {
			const querySnapshot = await getDocs(collection(db, "courses"));
			const coursesArray = [];
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
				const newData = { id: doc.id, ...doc.data() };
				coursesArray.push(newData);
			});
			setCourses(coursesArray);
		};

		run();
	}, []);

	const handleView = (course) => {
		router.push(`/coursePage?id=${course.id}&name=${course.name}`);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Available Courses</h2>
					<p>Manage your courses below:</p>
				</div>

				<div className={`row ${styles.cards}`}>
					{courses.map((course, index) => (
						<div key={index} className="col-md-6 col-lg-4">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{course.name}</h5>
									<p className="card-text">{course.mentor.name}</p>
									<button className="btn btn-primary" onClick={() => handleView(course)}>
										View
									</button>
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
