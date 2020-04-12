import { ADD_USER, SET_USERS } from "./actionTypes";

export const addUser = content => ({
    type: ADD_USER,
    payload: content
});

export const setUsers = content => ({
    type: SET_USERS,
    payload: content
})


