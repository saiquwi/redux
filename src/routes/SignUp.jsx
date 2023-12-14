import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/user/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectUserError } from "../redux/user/selectors";
import { z } from "zod";

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errors, setErrors] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
  

    function handleSignUp() {
      setErrors(null)
      dispatch(addUser({email, password, repeatPassword})).then(
        () => {  navigate('/login') },
        (err) => {  
          if(err instanceof z.ZodError) {
              setErrors(err.format())
            }
            else {
              setErrors({others:{_errors : [err.message]}})
            }
        }
      )
    }

    return <>
    <div className='prose flex flex-col gap-7 mt-6 mx-auto'>
      <h1 className="m-0">Sign Up</h1>
      <div className='prose flex flex-col gap-2'>
        <input placeholder='email' className='bg-gray-200 px-1.5' onChange={(e) => setEmail(e.target.value)}/>
        {errors?.email && <div className='text-red-400'>{errors?.email?._errors}</div>}
        <input placeholder='password' type='password' value={password} className='bg-gray-200 px-1.5' onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder="repeat password" type="password" value={repeatPassword} className='bg-gray-200 px-1.5' onChange={(e) => setRepeatPassword(e.target.value)}/>
        {errors?.password && <div className='text-red-400'>{errors?.password?._errors}</div>}
        </div>
      <button className='bg-gray-200 font-semibold w-1/3 mx-auto' onClick={handleSignUp}>Sign Up</button>
      {errors?.others && <div className='text-red-400'>{errors?.others?._errors}</div>}
   
    </div>
  </>
}
