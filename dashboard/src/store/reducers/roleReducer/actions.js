import http from "../../../http_common";

export const loadRoles = () => async(dispatch) => {
    dispatch({ type: "START_LOADING" });
    const response = await http.get("role");

    if (response.status === 200) {
        const { data } = response;
        dispatch({ type: "ROLES_LOAD", payload: data.payload });
        return dispatch({ type: "STOP_LOADING" });
    }

    return dispatch({ type: "ERROR", payload: [] });
}

export const createRole = (role) => async(dispatch) => {
    dispatch({ type: "START_LOADING" });
    const response = await http.post("role", role);

    if (response.status === 200) {
        dispatch({ type: "ROLE_CREATE" });
        return dispatch({ type: "STOP_LOADING" });
    }

    return dispatch({ type: "ERROR" });
}

export const updateRole = (role) => async(dispatch) => {
    dispatch({ type: "START_LOADING" });
    const response = await http.put("role", role);

    if (response.status === 200) {
        dispatch({ type: "ROLE_UPDATE" });
        return dispatch({ type: "STOP_LOADING" });
    }

    return dispatch({ type: "ERROR" });
}

export const deleteRole = (id) => async(dispatch) => {
    dispatch({ type: "START_LOADING" });
    const response = await http.delete("role?id=" + id);

    if (response.status === 200) {
        dispatch({ type: "ROLE_DELETE" });
        return dispatch({ type: "STOP_LOADING" });
    }

    return dispatch({ type: "ERROR" });
}