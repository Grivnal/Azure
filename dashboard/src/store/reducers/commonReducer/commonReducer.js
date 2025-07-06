const initState = {
    isLoading: false
}

const commonReducer = (state = initState, action) => {
    switch (action.type) {
        case "START_LOADING":
            return {...state, isLoading: true };
        case "STOP_LOADING":
            return {...state, isLoading: false };
        default:
            return state;
    }
}

export default commonReducer;