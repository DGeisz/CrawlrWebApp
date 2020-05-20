import {SIGNOUT, TEST1, TEST2} from "../constants";

const initialState = {
    user: "Danny Boi",
    userID: "sdsflkasdfj",
    val1: 0,
    val2: 2,
};


const rootReducer = (state = initialState, action) => {
    console.log("Now we're here")
    switch (action.type) {
        case TEST1:
            console.log(state);
            return Object.assign({}, state, {val1: state.val1 + state.val2});
        case TEST2:
            return Object.assign({}, state, {val2: state.val2 + 1});
        case SIGNOUT:
            console.log("Signing out");
            return Object.assign({}, state, {user: null, userID: null});
        default:
            return state;
    }
};

export default rootReducer;