import { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Authenticate from "./components/Authenticate/Authenticate";
import ButtonList from "./components/ButtonList/ButtonList";
import NavBar from "./components/NavBar/NavBar";
import { store, persistor } from "./store/store";

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
							<Route path="/" component={ButtonList} />
						</Switch>
					</div>
					{/* </Background> */}
				</HashRouter>
			</PersistGate>
		</Provider>
	);
}
