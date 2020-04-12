import { ADD_USER, SET_USERS } from "../actionTypes";

export const initialState = {
    users: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_USER: {
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        }
        case SET_USERS: {
            return {
                users: [...action.payload], 
            }
        }
        default:
            return state;
    }
}
