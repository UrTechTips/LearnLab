// Timer.component.jsx
import { auth } from "@/config/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { updateDoc, getFirestore, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

const Timer = ({ name, courseName }) => {
	const router = useRouter();
	const user = auth.currentUser;
	const db = getFirestore();
	const { seconds, minutes, totalSeconds, pause } = useStopwatch({ autoStart: true });

	const handleBack = async () => {
		pause();
		alert(`Time spent: ${totalSeconds} seconds`);

		try {
			const userRef = doc(db, "users", user.uid);
			const snapshot = await getDoc(userRef);

			if (snapshot.exists()) {
				const data = snapshot.data();
				const courses = data.courses || [];
				const courseIndex = courses.findIndex((course) => course.name === courseName);

				if (courseIndex !== -1) {
					courses[courseIndex].time += totalSeconds;
				} else {
					courses.push({
						name: courseName,
						time: totalSeconds,
					});
				}

				await updateDoc(userRef, { courses });
			}

			router.back();
		} catch (err) {
			console.error("Error updating document:", err);
		}
	};

	return (
		<div>
			<h1 className="text-light">{name}</h1>
			<h3 className="text-light h6">
				Time spent on page: {minutes}m {seconds}s
			</h3>
			<h4 className="btn btn-primary" onClick={handleBack}>
				Back
			</h4>
		</div>
	);
};

export default Timer;
