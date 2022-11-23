import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCotext } from "../store/auth-context";
import { EmployeContext } from "../store/employ-context";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement('#root');

function Employees() {
	// let subtitle;
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		// subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
	}
	const authCtx = useContext(AuthCotext);
	const empCtx = useContext(EmployeContext);
	const [employes, setEmployes] = useState([]);

	const navigate = useNavigate();

	const editHandler = (
		firstName,
		{ firstNames, lastName, email, password }
	) => {
		empCtx.updateEmploye(firstName, {
			firstNames,
			lastName,
			email,
			password,
		});
		setIsOpen(false);

	};

	const addEmp = () => {
		navigate("/rigister");
	};

	const deleteHandler = (firstName) => {
		empCtx.removeEmploye(firstName);
	};

	useEffect(() => {
		if (!authCtx.isAuthenticated) {
			navigate("/login");
		}

		setEmployes(empCtx.employes);
	}, [empCtx.employes]);

	return (
		<div>
			<h3
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "100px",
					color: "white",
				}}
			>
				Employees
			</h3>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "100px",
					color: "white",
				}}
				className="button"
			>
				<button onClick={addEmp}>Add Employe</button>
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<table id="employees">
					<thead>
						<tr>
							<th>First name</th>
							<th>Last name</th>
							<th>Edit / Delete User</th>
						</tr>
					</thead>
					<tbody>
						{employes.map((employe) => (
							<tr key={Math.random()}>
								<td>{employe.firstName}</td>
								<td>{employe.lastName}</td>
								<td style={{ display: "flex" }}>
									<i
										onClick={openModal}
										style={{
											color: "white",
											cursor: "pointer",
										}}
										className="fas fa-edit"
									></i>{" "}
									<i
										onClick={() =>
											deleteHandler(employe.firstName)
										}
										style={{
											color: "red",
											cursor: "pointer",
										}}
										className="fas fa-trash"
									></i>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Modal
				firstName={firstName}
				lastName={lastName}
				email={email}
				password={password}
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<button
					className="button"
					style={{ width: "30%", padding: "10px" }}
					onClick={closeModal}
				>
					close
				</button>

				<form
					className="form"
					onSubmit={(e) => {
						e.preventDefault()
						editHandler(firstName, {
							firstNames: firstName,
							lastName,
							email,
							password,
						})
					}
					}
				>
					<div className="email">
						<i className="fas fa-user"></i>
						<input
							type="text"
							onChange={(event) =>
								setFirstName(event.target.value)
							}
							placeholder="First name"
						/>
					</div>
					<div className="email">
						<i className="fas fa-user"></i>
						<input
							type="text"
							onChange={(event) =>
								setLastName(event.target.value)
							}
							placeholder="Last name"
						/>
					</div>
					<div className="email">
						<i className="fas fa-envelope"></i>
						<input
							type="email"
							onChange={(event) => setEmail(event.target.value)}
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
						<button type="submit">Update</button>
					</div>
				</form>
			</Modal>
		</div>
	);
}

export default Employees;
