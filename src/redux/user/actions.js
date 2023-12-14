import bcrypt from "bcryptjs";
import {User} from "../../utils/validation"

export const getUser = ({ email, password }) => async (dispatch) => {
    const query = new URLSearchParams({ email }).toString()
    const users = await fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
    if(user && bcrypt.compareSync(password, user.password)) {
        dispatch({
            type: 'USER/SET',
            payload: user,
        })
    }
    else {
        throw new Error('User/password not found')
    } })
}

export const addUser = ({email, password, repeatPassword}) => async (dispatch) => {
    if(password === repeatPassword) {
            User.parse({
              email: email,
              password: password,
          })
          const query = new URLSearchParams({email}).toString()
          const users =   await fetch(`http://localhost:5001/users?${query}`)
            .then((r) => r.json())
          const user = users[0]  
            if(user){
                throw new Error('Such user already exists')
            }
            else {
                const hashPwd = bcrypt.hashSync(password)
                fetch(`http://localhost:5001/users`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: hashPwd,
                        date: Date.now()
                    })
                })
            } 
    }
    else {
        throw new Error('Password mismatch')
    }
    
}