"use client";
import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginRegister = () => {
	const db = getFirestore();
	const provider = new GoogleAuthProvider();

	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((user) => {
				router.push("/dashboard");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			router.push("/dashboard");
		} catch (error) {
			console.error("Error signing in with Google:", error);
		}
	};

	return (
		<main className="form-signin w-100 m-auto d-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 4rem)" }}>
			<div>
				<h1 className="mb-3 fw-bold text-center text-light">Login</h1>

				<div className="form-floating mb-3">
					<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
					<label for="floatingInput">Email address</label>
				</div>
				<div className="form-floating mb-3">
					<input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<label for="floatingPassword">Password</label>
				</div>

				<div className="form-check text-start my-3">
					<input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
					<label className="form-check-label text-light" for="flexCheckDefault">
						Remember me
					</label>
				</div>

				<button className="btn btn-primary w-100 py-2 mb-3" type="submit" onClick={handleSubmit}>
					Sign in
				</button>
				<button className="btn btn-outline-secondary w-100 py-2" type="button" onClick={handleGoogleSignIn}>
					Sign in with Google
				</button>

				<p className="text-light mt-3">
					<span>
						Don{"'"}t have an account? <a href="/auth/register">Register</a>
					</span>
				</p>
			</div>
		</main>
	);
};

export default LoginRegister;
