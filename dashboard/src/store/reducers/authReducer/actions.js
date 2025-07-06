import { jwtDecode } from "jwt-decode";
import axios from "axios";
import http_common from "../../../http_common";

export const login = (values) => async(dispatch) => {
    const response = await http_common.post("account/login", {
        login: values.email,
        password: values.password,
    });

    if (response.status != 200) {
        return dispatch({ type: "ERROR" });
    }

    const data = response.data;
    const { accessToken, refreshToken } = data.payload;

    localStorage.setItem("rt", refreshToken);
    return dispatch(loginByToken(accessToken));
};

export const loginByToken = (token) => async(dispatch) => {
    localStorage.setItem("at", token);
    document.cookie = `at=${token}; path=/`;
    const user = jwtDecode(token);
    delete user.iss;
    delete user.aud;
    delete user.exp;
    delete user.jti;

    return dispatch({ type: "USER_LOGIN", payload: user });
};

export const register = (values) => async(dispatch) => {
    const url = process.env.REACT_APP_API_BASE_URL + "account/register";
    const response = await axios.post(url, values);
    if (response.status !== 200) {
        return dispatch({ type: "ERROR" });
    }

    const data = response.data;
    const jwtToken = data.payload;

    return dispatch(loginByToken(jwtToken));
};

export const logout = () => {
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    document.cookie = "at=; path=/";
    return { type: "USER_LOGOUT" };
};

export const refreshTokens = () => async(dispatch) => {
    const body = {
        refreshToken: localStorage.getItem("rt"),
        accessToken: localStorage.getItem("at"),
    };

    if (body.refreshToken && body.accessToken) {
        const response = await http_common.post("account/refresh", body);
        if (response.status !== 200) {
            return dispatch({ type: "ERROR" });
        }
        const data = response.data;
        const { accessToken, refreshToken } = data.payload;

        localStorage.setItem("rt", refreshToken);
        return dispatch(loginByToken(accessToken));
    }
};

export const googleLogin = (jwtToken) => {
    const payload = jwtDecode(jwtToken);

    const user = {
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        image: payload.picture,
        role: "user",
    };

    localStorage.setItem("user", JSON.stringify(user));
    return { type: "GOOGLE_LOGIN", payload: user };
};