export const getNotes = (authorId) => async (dispatch) => {
    try {
        dispatch({type: 'NOTES/LOADING'})
        const query = new URLSearchParams({ authorId }).toString()
        const notes = await fetch(`http://localhost:5001/notes?${query}`)
        .then((r) => r.json())
        dispatch({type: 'NOTES/SET', payload: notes})
    } catch(err) {
        dispatch({type: 'NOTES/ERROR', payload: err.toString()})
    }
}