import React, {useState}from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'


function SignIn(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = (e) =>{
        e.preventDefault();
        props.signIn({
            email,
            password
        })
    }
    if (props.auth.uid) return <Redirect to="/"/>
    return (
        <div className="container">
            <form onSubmit = {onSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value) }/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Login</button>
                </div>
                {props.authError ? <p>Login Failed</p> : null}
            </form>
        </div>
    )
}

const MapStateToProps = (state) =>{
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const MapStateToDispatch = (dispatch) =>{
    return {
        signIn : (credentials) => dispatch(signIn(credentials)) 
    }
}
export default connect(MapStateToProps, MapStateToDispatch)(SignIn)
