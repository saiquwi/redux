import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUserId } from "../redux/user/selectors";
import { addNote } from "../redux/note/actions";

export default function NewNote() {
    const [title, setTitle] = useState('') 
    const [text, setText] = useState('')
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    const authorId = useSelector(selectUserId)
    const dispatch = useDispatch()

    const handleAddNote = () => {
        dispatch(addNote({ authorId, title, text }))
        navigate('/notes')
    }

    return <>
        <div className='prose flex flex-col gap-4 mt-6 w-screen'>
            <div className='grid grid-cols-[15%_60%_15%] gap-7'>
                <Link to={`/notes`} className='bg-gray-200 px-1 h-5/6 no-underline'>Back</Link>
                <h1 className='m-0'>Create new note</h1>
            </div>
            <div className='flex flex-col gap-1'>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='bg-gray-200 px-1'/>
                <textarea value={text} onChange={(e) => setText(e.target.value)} className='bg-gray-200 h-12 px-1'/>
            </div>
            <button onClick={handleAddNote} className='bg-gray-200 font-semibold  w-1/3 mx-auto'>Create</button>
            {errors && <div className='text-red-400'>{errors}</div>}
        </div>            
    </>
}