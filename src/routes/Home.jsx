import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserDate, selectUserEmail } from '../redux/user/selectors'

export default function Home() {
    const email = useSelector(selectUserEmail)
    const date = useSelector(selectUserDate)
    
    return <>
        <div className='prose flex flex-col gap-7 mt-6'>
            <h1 className='m-0'>About me</h1>
            <div>
                <div><span className='font-bold'>Email:</span> {email}</div>
                <div><span className='font-bold'>Date sign up:</span> {new Date(date).toLocaleString()}</div>
            </div>
            <Link to={`/notes`} className='bg-gray-200 w-1/3 mx-auto no-underline'>Go to notes</Link>
        </div>
        </>
}