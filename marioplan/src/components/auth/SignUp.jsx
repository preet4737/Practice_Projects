import React, {useState}from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authAction'


function SignUp(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const onSubmit = (e) =>{
        e.preventDefault();
        props.signup({
        firstName,
        lastName,
        email,
        password
        })
    }

    if (props.auth.uid) return <Redirect to= "/"/>
    return (
        <div className="container">
            <form onSubmit = {onSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" onChange={e => setfirstName(e.target.value)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" onChange={e => setlastName(e.target.value)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value) }/>
                </div>
                <div className="input-field">
                    <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
                </div>
                <div className="red-text center">
                    {props.authError ? <p>Sign Up Failed</p> : null}
                </div>
            </form>
        </div>
    )
}


const MapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const MapStateToDispatch = (dispatch) =>{
    return {
        signup : (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(MapStateToProps, MapStateToDispatch)(SignUp)
