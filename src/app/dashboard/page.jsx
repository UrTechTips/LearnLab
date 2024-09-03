"use client";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../layout";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";
import { auth } from "@/config/firebaseConfig";

const Dashboard = () => {
	const user = auth.currentUser;
	const isLoggedIn = useContext(UserContext).isLoggedIn;
	const router = useRouter();
	useEffect(() => {
		if (!isLoggedIn) {
			router.push("/");
		}
	}, [isLoggedIn]);

	return (
		<>
			<div className={`row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5 ${styles.container}`}>
				<div className={`col d-flex flex-column align-items-start gap-2 ${styles.columnLeft}`}>
					<h2 className={`fw-bold  ${styles.sectionTitle}`}>Welcome back {user?.displayName}!,</h2>
					<p className={`${styles.sectionDescription}`}>Explore advanced analytics and track your learning progress with our intuitive dashboard.</p>
					<a href="#" className={`btn btn-primary btn-lg ${styles.ctaButton}`}>
						Rate Us
					</a>
				</div>

				<div className="col">
					<div className="row row-cols-1 row-cols-sm-2 g-4">
						<div className={`col d-flex flex-column gap-2 ${styles.feature}`}>
							<div className={`${styles.featureIconSmall} d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3 ${styles.icon}`}>
								<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
									<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
									<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
								</svg>
							</div>
							<h4 className={`fw-semibold mb-0   ${styles.featureTitle}`}>Learning Path</h4>
							<p className={`${styles.featureDescription}`}>Personalized educational journey and course structure</p>
						</div>

						<div className={`col d-flex flex-column gap-2 ${styles.feature}`}>
							<div className={`${styles.featureIconSmall} d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3 ${styles.icon}`}>
								<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-hourglass-split" viewBox="0 0 16 16">
									<path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.618a3.5 3.5 0 0 0-1.454 1.04A1.5 1.5 0 0 1 7.5 10v.5h-1v-.5a1.5 1.5 0 0 1-1.511-1.5A3.5 3.5 0 0 0 3.489 9a2.273 2.273 0 0 1-1.011-1.618V8a1.5 1.5 0 0 1 1.5-1.5v.5a3.5 3.5 0 0 0 3.5 3.5c.482 0 .948-.096 1.377-.266a3.5 3.5 0 0 0 1.477-1.07c.565-.573 1.01-1.179 1.28-1.818z" />
								</svg>
							</div>
							<h4 className={`fw-semibold mb-0   ${styles.featureTitle}`}>Progress</h4>
							<p className={`  ${styles.featureDescription}`}>Track and monitor learning achievements and milestones</p>
						</div>

						<div className={`col d-flex flex-column gap-2 ${styles.feature}`}>
							<div className={`${styles.featureIconSmall} d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3 ${styles.icon}`}>
								<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
									<path d="M14 2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12zM1 4a3 3 0 0 0 3-3h10a3 3 0 0 0 3 3v10a3 3 0 0 0-3 3H4a3 3 0 0 0-3-3V4z" />
									<path d="M7 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
									<path d="M4 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1z" />
								</svg>
							</div>
							<h4 className={`fw-semibold mb-0   ${styles.featureTitle}`}>Resources</h4>
							<p className={`  ${styles.featureDescription}`}>Access to educational materials and tools</p>
						</div>

						<div className={`col d-flex flex-column gap-2 ${styles.feature}`}>
							<div className={`${styles.featureIconSmall} d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3 ${styles.icon}`}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
									<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.29.573a.678.678 0 0 1-.764-.325l-1.004-1.673a.678.678 0 0 1 .234-.93l1.992-1.592a.678.678 0 0 0 .122-.58L4.39 1.572a.678.678 0 0 0-.735-.244z" />
								</svg>
							</div>
							<h4 className={`fw-semibold mb-0   ${styles.featureTitle}`}>Support</h4>
							<p className={`  ${styles.featureDescription}`}>Continuous assistance and guidance throughout your learning journey</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
