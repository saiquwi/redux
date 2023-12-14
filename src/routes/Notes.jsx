import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { connect, useDispatch, useSelector } from "react-redux"
import { selectUserId } from "../redux/user/selectors"
import { selectNotes, selectNotesError, selectNotesLoading } from "../redux/notes/selectors"
import { getNotes } from "../redux/notes/actions"
import { deleteNote, getNote } from "../redux/note/actions"

//export default 
function Notes(props) {
    const dispatch = useDispatch()
  //  const authorId = useSelector(selectUserId)

    useEffect(() => {
      props.dispatch(getNotes(props.authorId))
    }, [dispatch])

 //   const notes = useSelector(selectNotes)
 //   const loading = useSelector(selectNotesLoading)
 //   const error = useSelector(selectNotesError)
   
    const navigate = useNavigate()

    function handleViewNote(e) {
      props.dispatch(getNote(e.target.id, props.authorId)).then(
        () => {navigate('/note')}
      )
    }

    function handleEditNote(e) {
      props.dispatch(getNote(e.target.id, props.authorId)).then(
        () => {navigate('/editnote')}
      )
    }

    function handleDeleteNote(e) {
      props.dispatch(deleteNote(e.target.id, props.authorId)).then(
        () => navigate('/notes')
       )
      }  


    if (props.loading) {
      return <div className="mt-6 mx-auto text-xl">Loading...</div>
    }

    if (props.error) {
      return <div className="text-red-500 mt-6 mx-auto">{props.error}</div>
    }

    return <>
        <div className='prose flex flex-col gap-4 mt-6 w-screen'>
            <h1 className="m-0">Notes</h1>
            <Link to={`/newnote`} className='bg-gray-200 font-semibold w-1/3 mx-auto no-underline'>Add new note</Link>
            {
                            props.notes.sort((a, b) => ((a.date < b.date) ? 1 : -1))
                                 ?.map((note) => (
                                <div key={note.id} className="flex flex-row w-5/6 justify-between mx-auto px-2 bg-gray-200">
                                  <div id={note.id} onClick={handleViewNote} className="flex flex-row gap-2 justify-start w-5/6">
                                    <span className="font-semibold text-left" id={note.id}>{note.title}</span>
                                    <div className="pt-2 text-xs text-gray-400" id={note.id}>{new Date(note.date).toLocaleString()}</div>
                                  </div>
                                  <div className="flex flex-row gap-2 justify-around w-1/6">
                                    <button onClick={handleEditNote} id={note.id}>✍️</button>
                                    <button onClick={handleDeleteNote} id={note.id}>🗑</button>
                                  </div>
                                </div>
                            ))
                        
                    }
            
        </div>
    </>
}

const mapStateToProps = function(state) {
  return {
    authorId: state.user.data?.id,
    notes: state.notes.data,
    loading: state.notes.loading,
    error: state.notes.error
  }
}

export default connect(mapStateToProps)(Notes)
