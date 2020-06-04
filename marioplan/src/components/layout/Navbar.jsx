import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLink from './SignedInLink'
import SignedOutLink from './SignedOutLink'
import {connect} from 'react-redux'



function Navbar(props) {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Blog Page</Link>
                { !props.isEmpty ? <SignedInLink/> : <SignedOutLink /> }
                {/* <SignedInLink/>
                <SignedOutLink/> */}
            </div>
        </nav>
    )
}

const MapStateToProps = (state) =>{
    // console.log(state)
    return {
        isEmpty : state.firebase.auth.isEmpty
    }
}
export default connect(MapStateToProps)(Navbar)
