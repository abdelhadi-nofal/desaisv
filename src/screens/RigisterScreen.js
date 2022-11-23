import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EmployeContext } from '../store/employ-context';

function RigisterScreen() {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const empCtx = useContext(EmployeContext);

	const navigate = useNavigate();

	const rigister = (e) => {
		e.preventDefault();
		empCtx.addEmploye({firstName, lastName, email, password});
		navigate('/employees')
	}

  return (
	<div className="container">
	<div>
		<h3>Rigister</h3>
		<form className="form" onSubmit={rigister}>
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
				<button type="submit">Rigister</button>
			</div>
		</form>
	</div>
</div>
  )
}

export default RigisterScreen