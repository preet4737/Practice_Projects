const initState = {
    authError : null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            console.log('Sucessfully logged in')
            return{
                ...state,
                authError: null
            }
        case 'LOGIN_FAILED':
            console.log('Login Failed')
            return {
                ...state,
                authError: 'Login Failed'
            }
        case 'SIGNOUT_SUCCESS':
            console.log('Signout Successful')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_SUCCESS':
            console.log("Signup Successful")
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_FAILED':
            console.log('Signup failed')
            console.log(action.err.message)
            return{
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}


export default authReducer