import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as authActions from "../../store/actions/auth";
import styles from "./NavBar.module.css";
import ui from "../../ui.module.css";

export default function NavBar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const email = useSelector((state) => state.auth.email);
	const emailVerified = useSelector((state) => state.auth.emailVerified);
	const role = useSelector((state) => state.auth.role);

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
		history.push("/login");
	};

	const verifyEmailHandler = () => {
		history.push("/verify");
	};

	const adminClickHandler = () => {
		history.push("/admin");
	};

	const homeClickHandler = () => {
		history.push("/");
	};

	const AuthComponent = () => {
		if (email) {
			const emailText = <p className={styles.email}>{email}</p>;
			return (
				<div
					className={styles.dropdown}
					onMouseEnter={menuOpenHandler}
					onMouseLeave={menuCloseHandler}
				>
					<div className={`${styles.item}`}>
						Welcome&nbsp;{emailText}!
					</div>
					{menuOpen && (
						<div className={styles["option-container"]}>
							{!emailVerified && (
								<div
									className={`${styles.option} ${ui.pointer}`}
									onClick={verifyEmailHandler}
								>
									Verify Email
								</div>
							)}
							<div
								className={`${styles.option} ${ui.pointer}`}
								onClick={logoutHandler}
							>
								Logout
							</div>
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
			<div className={styles["div-container"]}>
				<div
					className={`${styles.item} ${ui.pointer}`}
					onClick={homeClickHandler}
				>
					Home
				</div>
				{role === "admin" && (
					<div
						className={`${styles.item} ${ui.pointer}`}
						onClick={adminClickHandler}
					>
						Admin
					</div>
				)}
			</div>
			<AuthComponent />
		</div>
	);
}
