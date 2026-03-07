export const getStoredAuth = () => {
	try {
		return {
			token: localStorage.getItem("token") || "",
			user: JSON.parse(localStorage.getItem("user") || "null"),
		};
	} catch {
		return {
			token: localStorage.getItem("token") || "",
			user: null,
		};
	}
};

export const saveAuth = (token, user) => {
	localStorage.setItem("token", token);
	localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
};
