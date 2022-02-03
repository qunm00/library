import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN } from './queries'

function Login(props) {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error)
        },
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setUser(username)
            localStorage.setItem('user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    if (!props.show) {
        return null 
    }

    const submit = async (event) => {
        event.preventDefault()
        login({
            variables: {
                username: username,
                password: password
            }
        })
    }

    return (
        <div>
            <form onSubmit={submit}>
                name
                <input
                    type='text'
                    value={username}
                    onChange={({target}) => setName(target.value)}
                /><br/>
                password 
                <input
                    type='password'
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
                <button>submit</button>
            </form>
        </div>
    )
}

export default Login
