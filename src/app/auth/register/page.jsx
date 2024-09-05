"use client";
import { useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
	const db = getFirestore();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [role, setRole] = useState("none");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (role == "none") {
			alert("Please select a Role");
		} else {
			setIsLoading(true);
			setError("");

			try {
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				const user = userCredential.user;

				await updateProfile(user, {
					displayName: name,
				});

				const userDoc = doc(db, "users", user.uid);
				await setDoc(userDoc, {
					role: role,
					email: email,
					name: name,
				});

				router.push("/dashboard");
			} catch (error) {
				console.log(error);
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleGoogleSignIn = async () => {
		if (role == "none") {
			alert("Please select a Role");
		} else {
			const provider = new GoogleAuthProvider();
			setIsLoading(true);
			setError("");

			try {
				const result = await signInWithPopup(auth, provider);
				const user = result.user;

				const userDoc = doc(db, "users", user.uid);
				const userSnapshot = await getDoc(userDoc);
				if (!userSnapshot.exists()) {
					await setDoc(userDoc, {
						role: role,
						email: user.email,
						name: user.displayName,
					});
				}

				router.push("/dashboard");
			} catch (error) {
				console.log(error);
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<main className="form-signin w-100 m-auto d-flex align-items-center justify-content-center" style={{ height: "calc(100vh - 4rem)" }}>
			<div>
				<h1 className="mb-3 fw-bold text-center text-light">Register</h1>

				<div className="form-floating mb-3">
					<input type="text" className="form-control" id="floatingName" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
					<label htmlFor="floatingName">Name</label>
				</div>
				<div className="form-floating mb-3">
					<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating mb-3">
					<input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<label htmlFor="floatingPassword">Password</label>
				</div>

				<div className="form-group mb-3">
					<label className="text-light mb-1" htmlFor="roleSelect">
						I am a
					</label>
					<select id="roleSelect" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
						<option value="none">Slect any one</option>
						<option value="student">Student</option>
						<option value="teacher">Teacher</option>
					</select>
				</div>

				{error && <p className="text-danger">{error}</p>}

				<button className="btn btn-primary w-100 py-2 mb-3" type="submit" disabled={isLoading} onClick={handleSubmit}>
					{isLoading ? "Registering..." : "Register"}
				</button>
				<button className="btn btn-outline-secondary w-100 py-2" type="button" onClick={handleGoogleSignIn} disabled={isLoading}>
					{isLoading ? "Signing in..." : "Sign up with Google"}
				</button>
				<p className="text-light mt-3">
					<span>
						Already have an account? <a href="/auth/login">Login</a>
					</span>
				</p>
			</div>
		</main>
	);
};

export default RegisterPage;
