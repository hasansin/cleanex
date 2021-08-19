import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState({
		loginState: "",
		loginRole: "",
	});

	const getLoggedIn = async (req, res) => {
		try {
			const res = await axios.get("/users/logged");
			setLoggedIn({ loginState: res.data.state, loginRole: res.data.role });
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getLoggedIn();
	}, []);

	return (
		<AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
