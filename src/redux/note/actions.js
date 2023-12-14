import { getNotes } from "../notes/actions"

export const addNote = ({authorId, title, text }) => async () => {
  await  fetch(`http://localhost:5001/notes`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            authorId: authorId,
            title: title,
            text: text,
            date: Date.now()
          })
    })
}

export const getNote = (id, authorId) => async (dispatch) => {
    const query = new URLSearchParams({
        id,
        authorId,
    }).toString()
    const notes = await fetch(`http://localhost:5001/notes?${query}`)
        .then((r) => r.json())
    const note = notes[0]
    if(note) {
        dispatch({type: 'NOTE/SET', payload: note})
    }
    else {
        throw new Error('Note not found')
    }
    
}

export const saveNote = ({noteId, authorId, title, text, date}) => async () => {
  await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          text: text,
          authorId: authorId,
          date: date
        })
    })
}

export const deleteNote = (id, authorId) => async (dispatch) => {
    await  fetch(`http://localhost:5001/notes/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
       }
    })
    dispatch(getNotes(authorId))
}