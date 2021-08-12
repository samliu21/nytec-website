import { apiKey } from "../../constants/Values";
import axios from "axios";
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
	const resetPasswordHandler = async () => {
		const email = window.prompt("輸入你的電子郵箱:");
		if (!email) {
			return;
		}

		try {
			await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
				{
					requestType: "PASSWORD_RESET",
					email: email,
				}
			);

			alert("電子郵件已經發送成功.");
		} catch (err) {
			let message = "發送電子郵件時出錯.";
			console.log(err.response.data.error.message);
			if (err.response) {
				switch (err.response.data.error.message) {
					case "EMAIL_NOT_FOUND":
						message = "電子郵件有錯誤。";
						break;
					case "INVALID_EMAIL":
						message = "電子郵件無效。";
						break;
					default:
						message = "發送電子郵件時出錯。";
				}
			}
			alert(message);
		}
	};

	return (
		<p onClick={resetPasswordHandler} className={styles.forgot}>
			Forgot your password?
		</p>
	);
}
