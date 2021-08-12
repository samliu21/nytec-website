import { useHistory } from "react-router";

import styles from "./NavBar.module.css";

export default function NavBar() {
	const history = useHistory();

	const loginClickHandler = () => {
		history.push("/login");
	};

	const homeClickHandler = () => {
		history.push("/");
	}

	return (
		<div className={styles.container}>
			<span onClick={homeClickHandler}>Home</span>
			<span onClick={loginClickHandler}>Login</span>
		</div>
	);
}
