import { createContext, useReducer } from "react";

export const EmployeContext = createContext({
	employes: [],
	addEmploye: ({ firstName, lastName, email, password }) => {},
	removeEmploye: (firstName) => {},
	// updateEmploye: (firstName, { firstName, lastName, email, password }) => {},
});

const employeReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			return [action.payload, ...state];
		case "UPDATE":
			const updatableEmployeIndex = state.findIndex(
				(employe) => employe.firstNames === action.payload.firstNames
			);
			const updatableEmp = state[updatableEmployeIndex];
			const updatedItem = { ...updatableEmp, ...action.payload.data };
			const updatedEmployes = [...state];
			updatedEmployes[updatableEmployeIndex] = updatedItem;
			return updatedEmployes;

		case "DELETE":
			return state.filter(
				(employe) => employe.firstName !== action.payload
			);
		default:
			return state;
	}
};

const EmployeContextProvider = ({ children }) => {
	const [employesState, dispatch] = useReducer(employeReducer, [
		{
			firstName: "rand1",
			lastName: "last1",
			email: "email1",
			password: "password1",
		},
	]);

	const addEmploye = ({ firstName, lastName, email, password }) => {
		dispatch({
			type: "ADD",
			payload: { firstName, lastName, email, password },
		});
	};

	const updateEmploye = (
		firstName,
		{ firstNames, lastName, email, password }
	) => {
		dispatch({
			type: "UPDATE",
			payload: {
				firstName: firstName,
				data: {
					firstName: firstNames,
					lastName: lastName,
					email: email,
					password: password,
				},
			},
		});
	};

	const removeEmploye = (firstName) => {
		dispatch({ type: "DELETE", payload: firstName });
	};

	const value = {
		employes: employesState,
		addEmploye: addEmploye,
		removeEmploye: removeEmploye,
		updateEmploye: updateEmploye,
	};

	return (
		<EmployeContext.Provider value={value}>
			{children}
		</EmployeContext.Provider>
	);
};

export default EmployeContextProvider;
