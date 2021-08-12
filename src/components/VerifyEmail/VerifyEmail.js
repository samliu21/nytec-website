import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import * as authActions from "../../store/actions/auth";
import { apiKey } from "../../constants/Values";
import axios from "axios";
import CustomButton from "../CustomButton/CustomButton";
import Logo from "../Logo/Logo";
import styles from "./VerifyEmail.module.css";

export default function VerifyEmail() {
	const idToken = useSelector((state) => state.auth.idToken);

	const history = useHistory();
	const dispatch = useDispatch();

	const sendEmailHandler = async () => {
		// Send verfication email
		try {
			await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
				{
					requestType: "VERIFY_EMAIL",
					idToken: idToken,
				}
			);

			alert(
				"驗證鏈接已發送至您的郵箱! 請檢查您的垃圾郵件或垃圾郵件文件夾。"
			);
		} catch (err) {
			let message = "無法發送您的驗證電子郵件。";
			if (err.response) {
				switch (err.response.data.error.message) {
					case "INVALID_ID_TOKEN":
						message = "您的 ID 無效。請重新登錄以獲取新的。";
						break;
					case "USER_NOT_FOUND":
						message = "找不到用戶。";
						break;
					case "TOO_MANY_ATTEMPTS_TRY_LATER":
						message = "太多的嘗試。 請稍後再試。";
						break;
					default:
						message = "無法發送您的驗證電子郵件。";
				}
			}
			alert(message);
		}
	};

	const verifyHandler = async () => {
		try {
			// Verify that the user has clicked the verification link
			const verify = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
				{
					idToken: idToken,
				}
			);

			const emailVerified = verify.data.users[0].emailVerified;

			// If the user has not verified their email
			if (emailVerified === false) {
				alert("你還沒有驗證!");
				return;
			}

			// Set redux state
			dispatch(authActions.sendToRedux({ emailVerified: emailVerified }));
			alert("您的電子郵件已通過驗證。");
			history.push("");
		} catch (err) {
			let message = "無法驗證您。";
			if (err.response) {
				switch (err.response.data.error.message) {
					case "INVALID_ID_TOKEN":
						message = "您的 ID 無效。請重新登錄以獲取新的。";
						break;
					case "USER_NOT_FOUND":
						message = "找不到用戶。";
						break;
					default:
						message = "無法驗證您。";
				}
			}
			alert("驗證您的電子郵件時出錯。", message);
		}
	};

	return (
		<div className={styles.container}>
			<Logo />
			<h2 className={styles.heading}>您的電子郵件未經驗證!</h2>
			<p className={styles.text}>
				按左鍵發送驗證郵件。 驗證完成後按右鍵。
			</p>
			<div className={styles["button-container"]}>
				<CustomButton onClick={sendEmailHandler}>
					發送電子郵!
				</CustomButton>
				<CustomButton onClick={verifyHandler}>我已經驗證!</CustomButton>
			</div>
		</div>
	);
}
