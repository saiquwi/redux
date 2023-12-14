export const selectUserId = (store) => store.user.data?.id
export const selectLoading = (store) => store.user.loading
export const selectUserEmail = (store) => store.user.data?.email
export const selectUserDate = (store) => store.user.data?.date
export const selectUserError = (store) => store.user.error