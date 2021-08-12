import { useState } from "react";
import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";
import { apiKey } from "../../constants/Values";
import axios from "axios";
import CustomButton from "../CustomButton/CustomButton";
import Input from "../Input/Input";
import styles from "./Authenticate.module.css";

export default function Authenticate(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypedPassword, setRetypedPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

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
	};

	const submitHandler = async () => {
		// Check that passwords match
		if (!isLogin && password !== retypedPassword) {
			alert("密碼不匹配! 請再試一次!");
			return;
		}

		setIsLoading(true);
		// --- LOGIN ---
		if (isLogin) {
			try {
				const response = await axios.post(
					`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
					{
						email: email,
						password: password,
						returnSecureToken: true,
					},
					{
						"Content-Type": "application/json",
					}
				);

				dispatch(authActions.authenticate(response));
			} catch (err) {
				let message = "處理您的信息時出錯。";
				if (err.response) {
					console.log(err.response.data.error.message);
					switch (err.response.data.error.message) {
						// Login errors
						case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
							message =
								"你有太多失敗的嘗試。 請重置您的密碼或稍後重試。";
							break;
						case "EMAIL_NOT_FOUND":
							message = "電子郵件不存在。";
							break;
						case "INVALID_EMAIL":
							message = "電子郵件無效。";
							break;
						case "INVALID_PASSWORD":
							message = "無效的密碼。";
							break;
						case "USER_DISABLED":
							message = "用戶已被禁用。";
							break;
					}
				}
				alert(message);
			}
		}
		// --- SIGNUP ---
		else {
			try {
				const response = await axios.post(
					`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${props.apiKey}`,
					{
						email: email,
						password: password,
						returnSecureToken: true,
					},
					{
						"Content-Type": "application/json",
					}
				);

				dispatch(authActions.authenticate(response));
			} catch (err) {
				// Error handling
				let message = "處理您的信息時出錯。";
				if (err.response) {
					switch (err.response.data.error.message) {
						case "EMAIL_EXISTS":
							message = "電子郵件已經存在。";
							break;
						case "INVALID_EMAIL":
							message = "電子郵件無效。";
							break;
						case "INVALID_PASSWORD":
							message = "無效的密碼。";
							break;
						case "USER_DISABLED":
							message = "用戶已被禁用。";
							break;
						case "TOO_MANY_ATTEMPTS_TRY_LATER":
							message = "太多的嘗試。";
							break;
						case "WEAK_PASSWORD : Password should be at least 6 characters":
							message = "密碼應至少為 6 個字。";
							break;
					}
				}

				alert(message);
			}
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{isLogin ? "登錄/Login" : "報名/Sign up"}</h2>

			<Input
				value={email}
				onChange={emailChangeHandler}
				placeholder="電郵 (Email)"
			/>
			<Input
				value={password}
				onChange={passwordChangeHandler}
				placeholder="密碼 (Password)"
				type="password"
			/>
			{!isLogin && (
				<Input
					value={retypedPassword}
					onChange={retypePasswordChangeHandler}
					placeholder="重新輸入您的密碼 (Retype password)"
					type="password"
				/>
			)}
			<div className={styles["button-container"]}>
				<CustomButton onClick={switchHandler}>
					{isLogin ? "開設新賬戶" : "切換到登錄"}
				</CustomButton>
				<button onClick={submitHandler}>
					{isLogin ? "登入" : "報名"}
				</button>
			</div>
		</div>
	);
}
