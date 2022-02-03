import { useLazyQuery } from '@apollo/client'
import React from 'react'
import { CURRENT_USER } from './queries'

function Recommendation() {
    // need to find user's favourite genre
    const data = useLazyQuery(CURRENT_USER)
    console.log(data)

    return (
        <div>
        </div>
    )
}

export default Recommendation
