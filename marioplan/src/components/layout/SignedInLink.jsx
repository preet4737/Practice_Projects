import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authAction'  

function SignedInLink(props) {
    return (
        <ul className="right">
            <li><NavLink to= '/create'>New Blog</NavLink></li>
            <li><a onClick={props.signOut} href='/'>Log Out</a></li>
            <li><NavLink to= '/' className='btn btn-floating pink lighten-1'>PS</NavLink></li>
        </ul>
    )
}

const MapStateToDispatch = (dispatch) => {
    return {
        signOut : () => dispatch(signOut())
    }
}
export default connect(null, MapStateToDispatch)(SignedInLink)
