import "./App.css";
import Login from "./screens/LoginScreen";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useNavigation,
} from "react-router-dom";
import Employees from "./screens/EmployeesScreen";
import Header from "./components/Header";
import AuthContextProvider from "./store/auth-context";
import RigisterScreen from "./screens/RigisterScreen";
import EmployeContextProvider from "./store/employ-context";

function App() {
	return (
		<div className="App">
			<EmployeContextProvider>
				<AuthContextProvider>
					<Router>
						<Header />
						<Routes>
							<Route path="login" element={<Login />} />
							<Route path="" element={<Login />} />
							<Route path="employees" element={<Employees />} />
							<Route
								path="rigister"
								element={<RigisterScreen />}
							/>

							{/* <Route path="*" element={<NoPage />} /> */}
						</Routes>
					</Router>
				</AuthContextProvider>
			</EmployeContextProvider>
		</div>
	);
}

export default App;
