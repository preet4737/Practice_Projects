import React from 'react'
import {NavLink} from 'react-router-dom'

function SignedOutLink() {
    return (
        <ul className="right">
            <li><NavLink to= '/signup'>SignUp</NavLink></li>
            <li><NavLink to= '/signin'>LogIn</NavLink></li>
            {/* <li><NavLink to= '/' className='btn btn-floating pink lighten-1'>PS</NavLink></li> */}
        </ul>
    )
}

export default SignedOutLink
