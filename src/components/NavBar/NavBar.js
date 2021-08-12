import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as authActions from "../../store/actions/auth";
import styles from "./NavBar.module.css";
import ui from "../../ui.module.css";

export default function NavBar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const email = useSelector((state) => state.auth.email);

	const history = useHistory();
	const dispatch = useDispatch();

	const menuOpenHandler = () => {
		setMenuOpen(true);
	};

	const menuCloseHandler = () => {
		setMenuOpen(false);
	};

	const loginClickHandler = () => {
		history.push("/login");
	};

	const logoutHandler = () => {
		setMenuOpen(false);
		dispatch(authActions.logout());
	};

	const homeClickHandler = () => {
		history.push("/");
	};

	const AuthComponent = () => {
		if (email) {
			return (
				<div
					className={styles.dropdown}
					onMouseEnter={menuOpenHandler}
					onMouseLeave={menuCloseHandler}
				>
					<div className={`${styles.item}`}>{`Welcome ${email}!`}</div>
					{menuOpen && (
						<div className={`${styles.logout} ${ui.pointer}`} onClick={logoutHandler}>
							Logout
						</div>
					)}
				</div>
			);
		} else {
			return (
				<div
					className={`${styles.item} ${ui.pointer}`}
					onClick={loginClickHandler}
				>
					Login
				</div>
			);
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={`${styles.item} ${ui.pointer}`}
				onClick={homeClickHandler}
			>
				Home
			</div>
			<AuthComponent />
		</div>
	);
}
