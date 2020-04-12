export const getUsersState = store => store.users

export const getUsers = store =>
  getUsersState(store) ? getUsersState(store) : []
