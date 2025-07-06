const authState = {
    user: null,
    isAuth: false
}

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {...state, isAuth: true, user: action.payload };
        case "USER_REGISTER":
            return {...state, isAuth: true, user: action.payload };
        case "USER_LOGOUT":
            return {...state, isAuth: false, user: null };
        case "GOOGLE_LOGIN":
            return {...state, isAuth: true, user: action.payload };
        default:
            return state;
    }
}

export default authReducer;