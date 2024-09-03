"use client";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { createContext, useState, useEffect } from "react";
import Nabar from "@/components/navbar/navbar.component";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
// 	title: "LearnLab",
// 	description: "Learn Lab is a learning website.",
// };

export const UserContext = createContext({ isLoggedIn: false, user: null, role: null });

export default function RootLayout({ children }) {
	const db = getFirestore();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUser(user);

				const userSnapshot = await getDoc(doc(db, "users", user.uid));
				console.log(userSnapshot.data());
				setRole(userSnapshot.data().role);
			} else {
				setIsLoggedIn(false);
				setRole(null);
				setUser(null);
			}
		});

		return unsubscribe;
	}, []);

	return (
		<html lang="en">
			<body className={inter.className}>
				<UserContext.Provider value={{ isLoggedIn, user, role }}>
					<Nabar isLoggedIn={isLoggedIn} />
					{children}
				</UserContext.Provider>
			</body>
		</html>
	);
}
