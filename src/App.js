import { HashRouter, Switch, Route } from "react-router-dom";

import ButtonList from "./components/ButtonList/ButtonList";
import data from "./data/data";

export default function App() {
	return (
		<HashRouter>
			<Switch>
				<Route path="/">
					<ButtonList children={data.children} />
				</Route>
			</Switch>
		</HashRouter>
	);
}
