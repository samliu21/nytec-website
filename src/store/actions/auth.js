import axios from "axios";

import { apiKey } from "../../constants/Values";

export const SEND_TO_REDUX = "SEND_TO_REDUX";
export const LOGOUT = "LOGOUT";

// Auto logout timer (upon token expiry)
let timer;

// Send data to Redux state
export const sendToRedux = (kwargs) => {
	return {
		type: SEND_TO_REDUX,
		kwargs: kwargs,
	};
};

// Set new idToken (and the refresh token and expiration date that came along with it)
// Reset logout timer
export const setIdToken = (
	idToken,
	refreshToken,
	expirationDate,
	expiresIn
) => {
	return async (dispatch) => {
		dispatch(setLogoutTimer(expiresIn));

		dispatch(
			sendToRedux({
				idToken: idToken,
				refreshToken: refreshToken,
				expirationDate: expirationDate,
			})
		);
	};
};

// Get a new id token
export const refreshIdToken = (refreshToken, existingData = null) => {
	return async (dispatch) => {
		try {
			let response = existingData;
			if (!response) {
				response = await axios.post(
					`https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
					{
						grant_type: "refresh_token",
						refresh_token: refreshToken,
					}
				);
			}
			const newIdToken = response.data.id_token;
			const newRefreshToken = response.data.refresh_token;
			const expiresIn = +response.data.expires_in * 1000;

			const expirationDate = new Date(
				new Date().getTime() + expiresIn
			).toISOString();

			dispatch(
				setIdToken(
					newIdToken,
					newRefreshToken,
					expirationDate,
					expiresIn
				)
			);
		} catch (err) {
			console.log(err.message);
		}
	};
};

// When the idToken invalidates, try to refresh the id token or logout the user otherwise
export const setLogoutTimer = (expirationTime) => {
	return async (dispatch, getState) => {
		console.log(getState().auth);
		clearTimer();
		timer = setTimeout(async () => {
			// const userData = await AsyncStorage.getItem("userData");
			const refreshToken = getState().auth.refreshToken;

			if (refreshToken) {
				dispatch(refreshIdToken(refreshToken));
			} else {
				dispatch(logout());
			}
		}, expirationTime);
	};
};

// Clear the logout timer
const clearTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

// Clear redux state and remove any storage in AsyncStorage
export const logout = () => {
	clearTimer();

	return {
		type: LOGOUT,
	};
};

// Gets the role and email verification status from sendToDatabase()
// Sends data to Redux
export const authenticate = (response) => {
	return async (dispatch) => {
		try {
			let { idToken, localId, email, expiresIn, refreshToken } =
				response.data;
			expiresIn = +expiresIn * 1000;

			const expirationDate = new Date(
				new Date().getTime() + expiresIn
			).toISOString();

			dispatch(
				sendToRedux({
					idToken: idToken,
					userId: localId,
					email: email,
					expirationDate: expirationDate,
					refreshToken: refreshToken,
				})
			);

			dispatch(sendToDatabase(localId, idToken));

			dispatch(setLogoutTimer(expiresIn));
		} catch (err) {
			console.log(err.message);
		}
	};
};

// Set the user's data in AsyncStorage and their role to be user if they are signing up
// Attempt to send push token to Firebase backend
const sendToDatabase = (userId, idToken) => {
	return async (dispatch) => {
		try {
			// Attempt to get user role
			const loginResponse = await axios.get(
				`https://nytec-app-default-rtdb.firebaseio.com/users/${userId}.json?auth=${idToken}`
			);

			const role = loginResponse.data ? loginResponse.data.role : "user";

			// Attempt to get user email verification status
			const verifyResponse = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
				{
					idToken: idToken,
				}
			);

			const emailVerified = verifyResponse.data.users[0].emailVerified;
			console.log(role);

			dispatch(
				sendToRedux({
					role: role,
					emailVerified: emailVerified,
				})
			);

			// If user doesn't have a role yet, set it
			if (!loginResponse.data) {
				await axios.put(
					`https://nytec-app-default-rtdb.firebaseio.com/users/${userId}.json?auth=${idToken}`,
					{
						role: role,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
			}
		} catch (err) {
			console.log(err.message);
		}
	};
};
