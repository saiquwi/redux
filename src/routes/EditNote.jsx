import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectUserId } from "../redux/user/selectors"
import { deleteNote, getNote, saveNote } from "../redux/note/actions"
import { selectNote, selectNoteDate, selectNoteId } from "../redux/note/selectors"

export default function EditNote() {
    const dispatch = useDispatch()
    const noteId = useSelector(selectNoteId)
    const authorId = useSelector(selectUserId)
    const date = useSelector(selectNoteDate)

    useEffect(() => {
      dispatch(getNote(noteId, authorId))
    }, [dispatch])

    const note = useSelector(selectNote)

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)

    const navigate = useNavigate()

    function handleDeleteNote() {
        dispatch(deleteNote(noteId, authorId)).then(() => navigate('/notes'))
    }
  
    function handleSaveNote() {
        dispatch(saveNote({noteId, authorId, title, text, date})).then(() => navigate('/notes'))
    }
  
    return (
      <>
        <div className="prose flex flex-col gap-4 mt-6 w-screen">
          <div className="flex flex-row justify-between">
            <Link to={`/notes`} className="bg-gray-200 px-1 h-5/6 no-underline">Back</Link>
            <h1 className="m-0">Edit note</h1>
            <button onClick={handleDeleteNote}>🗑</button>
          </div>
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      className="bg-gray-200"
                    />
                    <textarea
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      className="bg-gray-200 h-full resize-y"
                    />
                  </div>
                  <button onClick={handleSaveNote} className='bg-gray-200 font-semibold  w-1/3 mx-auto'>Save</button>
        </div>
      </>
    );
  }