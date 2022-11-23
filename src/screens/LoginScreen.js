import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthCotext } from "../store/auth-context";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successLogin, setSuccessLogin] = useState();

	const authCtx = useContext(AuthCotext);

	const navigate = useNavigate();

	const login = (e) => {
		e.preventDefault();

		if (email !== "test@desaisiv.com" || password !== "123") {
			setSuccessLogin(false);

		} else {
			setSuccessLogin(true);
			authCtx.authenticate('success')
			navigate("/employees");
		}
	};

	useEffect(() => {}, []);
	return (
			<div className="container">
				<div>
					<h3>Login</h3>
					<form className="form" onSubmit={login}>
						<div className="email">
							<i className="fas fa-envelope"></i>
							<input
								type="email"
								onChange={(event) =>
									setEmail(event.target.value)
								}
								placeholder="Email"
							/>
						</div>
						<div className="password">
							<i className="fas fa-key"></i>
							<input
								type="password"
								onChange={(event) =>
									setPassword(event.target.value)
								}
								placeholder="Password"
							/>
						</div>
						<div className="button">
							<button type="submit">Login</button>
						</div>
						{/* <div>Create account! <a style={{textDecoration: 'none' ,color: 'green'}} href="/rigister">rigister</a></div> */}

					</form>
					{successLogin === false && (
						<div className="danger">Invalid credentials!</div>
					)}
				</div>
			</div>
	);
};

export default Login;
