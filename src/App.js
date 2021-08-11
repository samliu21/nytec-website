import { HashRouter, Switch, Route } from "react-router-dom";

import ButtonList from "./components/ButtonList/ButtonList";
import NavBar from "./components/NavBar/NavBar";

export default function App() {
	return (
		<HashRouter>
			<div>
				<NavBar />
			</div>
			<div id="main">
				<Switch>
					<Route path="/" component={ButtonList} />
				</Switch>
			</div>
		</HashRouter>
	);
}
