export const selectNote = (store) => store.note.data
export const selectNoteId = (store) => store.note.data?.id
export const selectNoteTitle = (store) => store.note.data?.title
export const selectNoteText = (store) => store.note.data?.text
export const selectNoteDate = (store) => store.note.data?.date
export const selectNoteLoading = (store) => store.note.loading