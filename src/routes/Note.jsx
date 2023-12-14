import { useEffect } from "react"
import { Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectNote, selectNoteId } from "../redux/note/selectors"
import { selectUserId } from "../redux/user/selectors"
import { deleteNote, getNote } from "../redux/note/actions"

export default function Note() {

    const noteId = useSelector(selectNoteId)
    const authorId = useSelector(selectUserId)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getNote(noteId, authorId))
      }, [dispatch])

    const navigate = useNavigate()
    const note = useSelector(selectNote)

    function handleDeleteNote() {
        dispatch(deleteNote(noteId, authorId)).then(() => navigate('/notes'))
    }

    return <>
        <div className='prose flex flex-col gap-4 mt-6 w-screen'>
            <div className='flex flex-row justify-between content-center'>
                <Link to={`/notes`} className='bg-gray-200 px-1 h-5/6  no-underline'>Back</Link>
                <h1 className='m-0'>{note.title}</h1>
                <div>
                    <Link to={`/editnote`} className="no-underline mr-2 text-lg">✍️</Link>
                    <button onClick={handleDeleteNote} className="text-lg">🗑</button>
                </div>
            </div>
            <div className='bg-gray-200 text-start px-2 break-words'>{note.text}</div>
        </div>
    </> 
}