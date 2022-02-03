import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from './queries'
import Select from 'react-select'

function AuthorBirthYear({ authors }) {
    const [name, setName] = useState('')
    const [born, setBirth] = useState('')

    const options = authors.map(author => ({
        value: author.name, 
        label: author.name
    }))

    const [ editBirthYear ] = useMutation(EDIT_BIRTHYEAR, {
        refetchQueries: [ { query: ALL_AUTHORS }]
    })

    const submit = async (event) => {
        event.preventDefault()

        editBirthYear({
            variables: {
                name,
                born
            }
        })

        setName('')
        setBirth('')
    }

    return (
        <div>
            <h2>set birthyear</h2> 
            <form onSubmit={submit}>
                name<Select
                    value={name}
                    onChange={(target) => setName(target.value)}
                    options={options}
                />
                <div>
                    born
                    <input
                        value={born}
                        onChange={(target) => setBirth(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default AuthorBirthYear
