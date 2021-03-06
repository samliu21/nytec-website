import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Admin from "./components/Admin/Admin";
import AppStartup from "./components/AppStartup/AppStartup";
import Authenticate from "./components/Authenticate/Authenticate";
import ButtonList from "./components/ButtonList/ButtonList";
import Error from "./components/Error/Error";
import NavBar from "./components/NavBar/NavBar";
import { store, persistor } from "./store/store";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<HashRouter>
					<AppStartup>
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
								<Route exact path="/error" component={Error} />
								<Route path="/" component={ButtonList} />
							</Switch>
						</div>
						{/* </Background> */}
					</AppStartup>
				</HashRouter>
			</PersistGate>
		</Provider>
	);
}
