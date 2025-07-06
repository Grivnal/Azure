const roleState = {
    roles: [],
    isLoaded: false,
    count: 0
}

const roleReducer = (state = roleState, action) => {
    switch (action.type) {
        case "ROLES_LOAD":
            return {...state, roles: action.payload, isLoaded: true, count: action.payload.length };
        case "ROLE_CREATE":
            return {...state, isLoaded: false }
        case "ROLE_UPDATE":
            return {...state, isLoaded: false }
        case "ROLE_DELETE":
            return {...state, isLoaded: false }
        default:
            return state;
    }
}

export default roleReducer;