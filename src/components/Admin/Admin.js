import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";
import CustomButton from "../CustomButton/CustomButton";
import Input from "../Input/Input";
import styles from "./Admin.module.css";
import ui from "../../ui.module.css";

export default function Admin() {
	const [title, setTitle] = useState("");

	const role = useSelector((state) => state.auth.role);
	const idToken = useSelector((state) => state.auth.idToken);
	const messageRef = useRef();

	const history = useHistory();

	const titleChangeHandler = (e) => {
		setTitle(e.target.value);
	};

	const submitHandler = async () => {
		const message = messageRef.current.value;

		const response = window.confirm(
			"您確定要將此電子郵件發送給所有用戶嗎?"
		);
		if (response) {
			console.log("Sending email with message: " + message);

			let response;
			try {
				response = await axios.get(
					`https://nytec-app-default-rtdb.firebaseio.com/emails.json?auth=${idToken}`
				);
			} catch (err) {
				alert("Can't get user emails.");
				return;
			}

			const emailList = new Set();
			for (const key in response.data) {
				emailList.add(response.data[key]["email"]);
			}

			if (emailList.size > 300) {
				alert(
					"Email list size cannot be greater than 300. Please email me at sam4button@gmail.com for details."
				);
			}

			try {
				await axios.post(
					"https://nytec-website-api.herokuapp.com",
					{
						sender: "nytec.app@gmail.com",
						send_to: Array.from(emailList),
						subject: title,
						html_content: message,
						id_token: idToken,
					},
					{
						"Content-Type": "application/json",
					}
				);
				alert("Emails have been sent!");
			} catch (err) {
				alert("Could not send emails.");
			}
		}
	};

	useEffect(() => {
		if (role !== "admin") {
			history.push("/error");
		}
	}, [role, history]);

	return (
		<div className={styles.container}>
			<h2 className={ui.title}>标题</h2>
			<Input
				value={title}
				onChange={titleChangeHandler}
				placeholder="標題"
			/>
			<textarea
				rows={5}
				className={styles.message}
				placeholder="信息"
				ref={messageRef}
			/>
			<CustomButton onClick={submitHandler} className={styles.btn}>
				發電子郵件
			</CustomButton>
		</div>
	);
}
