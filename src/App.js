import { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Admin from "./components/Admin/Admin";
import Authenticate from "./components/Authenticate/Authenticate";
import ButtonList from "./components/ButtonList/ButtonList";
import NavBar from "./components/NavBar/NavBar";
import { store, persistor } from "./store/store";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";

export default function App() {
	useEffect(() => {}, []);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<HashRouter>
					{/* <Background> */}
					<div>
						<NavBar />
					</div>
					<div id="main">
						<Switch>
							<Route
								exact
								path={["/login", "/signup"]}
								component={Authenticate}
							/>
							<Route
								exact
								path="/verify"
								component={VerifyEmail}
							/>
							<Route exact path="/admin" component={Admin} />
							<Route path="/" component={ButtonList} />
						</Switch>
					</div>
					{/* </Background> */}
				</HashRouter>
			</PersistGate>
		</Provider>
	);
}
