import Courses from "@/components/courses/courses.component";
import React from "react";
import styles from "./courses.module.scss";

const CoursesC = () => {
	return (
		<div className="mt-5">
			<div className={styles.header}>
				<h2>Available Courses</h2>
				<p>Manage your courses below:</p>
			</div>
			<Courses></Courses>
		</div>
	);
};

export default CoursesC;
