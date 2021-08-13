import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import CustomButton from "../CustomButton/CustomButton";
import Input from "../Input/Input";
import styles from "./Admin.module.css";
import ui from "../../ui.module.css";

export default function Admin() {
	const [title, setTitle] = useState("");

	const role = useSelector((state) => state.auth.role);
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