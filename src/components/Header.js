import React, { useContext } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthCotext } from "../store/auth-context";

function Header() {

	const authCtx = useContext(AuthCotext);



	const navigate = useNavigate();

	const homeHandler = () =>{
		if (authCtx.isAuthenticated) {
			navigate('/employees');
		} else {
			navigate('/login');

		}
	}

	const logout = () => {
		authCtx.authenticate("");
		navigate("/login");
	};

	return (
		<div>
			<ul className="nav">
				<li onClick={homeHandler}>Home</li>

				{authCtx.isAuthenticated && (
					<li>
						<Link
							style={{
								textDecoration: "none",
								color: "#6bcdc0",
							}}
							to={"/employees"}
						>
							Employees{" "}
						</Link>
					</li>
				)}

				{!authCtx.isAuthenticated && (
					<li>
						<Link
							to="/login"
							style={{
								textDecoration: "none",
								color: "#6bcdc0",
							}}
						>
							Login
						</Link>{" "}
					</li>
				)}

				{authCtx.isAuthenticated && <li onClick={logout}>Logout</li>}
			</ul>
		</div>
	);
}

export default Header;
