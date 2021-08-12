import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import CustomButton from "../CustomButton/CustomButton";
import Input from "../Input/Input";
import styles from "./Admin.module.css";

export default function Admin() {
	const [title, setTitle] = useState("");

	const role = useSelector((state) => state.auth.role);
	const messageRef = useRef();

	const history = useHistory();

	const titleChangeHandler = (e) => {
		setTitle(e.target.value);
	};

	const submitHandler = () => {
		const message = messageRef.current.value;

		const response = window.confirm("您確定要將此電子郵件發送給所有用戶嗎?");
		if (response) {
			// Make email API call
		}
	};

	useEffect(() => {
		if (role !== "admin") {
			history.push("/");
		}
	}, [role, history]);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>标题</h2>
			<Input
				value={title}
				onChange={titleChangeHandler}
				placeholder="標題"
			/>
			<textarea
				rows={15}
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
