const userState = {
    users: [],
    isLoaded: false,
    count: 0
}

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case "USERS_LOAD":
            return {...state, users: action.payload, isLoaded: true, count: action.payload.length };
        case "USER_CREATE":
            return {...state, users: action.payload, count: state.count + 1 }
        case "USER_UPDATE":
            return {...state, users: action.payload }
        case "USER_DELETE":
            return {...state, users: action.payload, count: state.count - 1 }
        default:
            return state;
    }
}

export default userReducer;