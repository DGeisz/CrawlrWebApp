import {SIGNOUT, TEST1, TEST2} from "../constants";

export const test1 = () => {
    return {type: TEST1}
};

export const test2 = () => {
    return {type: TEST2};
};

export const signOut = () => {
    return {type: SIGNOUT};
}
