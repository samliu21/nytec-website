import { HashRouter, Switch, Route } from "react-router-dom";

import ButtonList from "./components/ButtonList/ButtonList";

export default function App() {
	return (
		<HashRouter>
			<Switch>
				<Route path="/" component={ButtonList} />
			</Switch>
		</HashRouter>
	);
}
