import { useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Authenticate from "./components/Authenticate/Authenticate";
import ButtonList from "./components/ButtonList/ButtonList";
import NavBar from "./components/NavBar/NavBar";

export default function App() {
	useEffect(() => {}, []);

	return (
		<HashRouter>
			{/* <Background> */}
				<div>
					<NavBar />
				</div>
				<div id="main">
					<Switch>
						<Route exact path={["/login", "/signup"]} component={Authenticate} />
						<Route path="/" component={ButtonList} />
					</Switch>
				</div>
			{/* </Background> */}
		</HashRouter>
	);
}
