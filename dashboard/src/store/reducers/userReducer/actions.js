import http from "../../../http_common";

export const loadUsers = () => async(dispatch) => {
    const response = await http.get("user");

    if (response.status === 200) {
        const { data } = response;
        const { payload } = data;
        return dispatch({ type: "USERS_LOAD", payload: payload });
    }

    return dispatch({ type: "ERROR", payload: [] });
};

export const createUser = (user) => {
    user.id = 1;
    const localData = localStorage.getItem("users");
    let users = [];

    if (localData) {
        users = JSON.parse(localData);
        user.id = users[users.length - 1].id + 1;
    }
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
    return { type: "USER_CREATE", payload: users };
};

export const updateUser = (user) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex(
        (u) => u.id.toString() === user.id.toString()
    );
    if (index >= 0) {
        users[index] = {...user };
        localStorage.setItem("users", JSON.stringify(users));
        return { type: "USER_UPDATE", payload: users };
    } else {
        return { type: "ERROR", payload: "user not found" };
    }
};

export const deleteUser = (id) => {
    const localData = localStorage.getItem("users");
    if (localData) {
        const users = JSON.parse(localData);
        const updatedUsers = users.filter(
            (u) => u.id.toString() !== id.toString()
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { type: "USER_DELETE", payload: updatedUsers };
    }
};