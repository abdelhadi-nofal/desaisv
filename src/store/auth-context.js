import { createContext, useState } from "react";

export const AuthCotext = createContext({
	token: "",
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {},
});

const AuthContextProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState("");

	const authenticate = (token) => {
		setAuthToken(token);
	};

	const logout = () => {
		setAuthToken(null);
	};

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	};

	return <AuthCotext.Provider value={value}>{children}</AuthCotext.Provider>;
};

export default AuthContextProvider;
