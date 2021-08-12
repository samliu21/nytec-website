import { useState } from "react";

import styles from "./Authenticate.module.css";

export default function Authenticate(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypedPassword, setRetypedPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);

	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};

	const passwordChangeHandler = (e) => {
		setPassword(e.target.value);
	};

	const retypePasswordChangeHandler = (e) => {
		setRetypedPassword(e.target.value);
	};

	const switchHandler = () => {
		setIsLogin((state) => !state);
	}

	return (
		<div className={styles.container}>
			<h2>{isLogin ? "Login" : "Sign up"}</h2>

			<input value={email} onChange={emailChangeHandler} />
			<input value={password} onChange={passwordChangeHandler} />
			{!isLogin && (
				<input
					value={retypedPassword}
					onChange={retypePasswordChangeHandler}
				/>
			)}
			<div className={styles["button-container"]}>
				<button onClick={switchHandler}>Switch</button>
				<button>Submit</button>
			</div>
		</div>
	);
}
