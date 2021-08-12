import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import styles from "./NavBar.module.css";

export default function NavBar() {
	const email = useSelector((state) => state.auth.email);
	console.log(email);

	const history = useHistory();

	const loginClickHandler = () => {
		history.push("/login");
	};

	const homeClickHandler = () => {
		history.push("/");
	};

	return (
		<div className={styles.container}>
			<div className={styles.item} onClick={homeClickHandler}>
				Home
			</div>
			<div className={styles.item} onClick={loginClickHandler}>
				{email ? `Welcome ${email}!` : "Login"}
			</div>
		</div>
	);
}
