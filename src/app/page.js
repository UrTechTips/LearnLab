"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import Nabar from "@/components/navbar/navbar.component";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const handleLogin = () => {
		router.push("/auth/login");
	};
	const handleRegister = () => {
		router.push("/auth/register");
	};

	return (
		<>
			{/* <Nabar></Nabar> */}
			<div className={`${styles.heroSection} text-center`}>
				<div className={styles.background}></div>
				<div className={styles.content}>
					<h1 className={`display-5 fw-bold ${styles.heroText}`}>Welcome to learn lab</h1>
					<div className="col-lg-6 mx-auto">
						<p className="lead mb-4">Discover a new way of learning with personalized paths, engaging resources, and real-time progress tracking. Whether you&#39;re mastering new skills or exploring fresh topics, Learn Lab empowers you to take control of your education. Start your journey today and unlock the knowledge you need to succeed.</p>
						<div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
							<button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={handleRegister}>
								Sign up
							</button>
							<button type="button" className="btn btn-secondary btn-lg px-4" onClick={handleLogin}>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
