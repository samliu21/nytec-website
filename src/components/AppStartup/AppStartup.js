import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

export default function AppStartup(props) {
	const expirationDate = useSelector((state) => state.auth.expirationDate);
	const refreshToken = useSelector((state) => state.auth.refreshToken);

	const dispatch = useDispatch();

	useEffect(() => {
		const timeDifference = new Date(expirationDate) - new Date();
		if (timeDifference < 0) {
			dispatch(authActions.refreshIdToken(refreshToken));
		}
	}, [dispatch, expirationDate, refreshToken]);

	return props.children;
}