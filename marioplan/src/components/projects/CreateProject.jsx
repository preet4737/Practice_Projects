import React, {useState}from 'react'
import { connect } from 'react-redux'
import {createProject} from '../../store/actions/projectAction'
import {Redirect} from 'react-router-dom'

function CreateProject(props) {

    const {auth} = props;
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const onSubmit = (e) =>{
        e.preventDefault();
        props.createProject({
            title,
            content
        })
        props.history.push('/')
    }
    if (!auth.uid) return <Redirect to='/signin'/>
    return (
        <div className="container">
            <form onSubmit = {onSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Project</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="input-field">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" className="materialize-textarea" onChange={e => setContent(e.target.value)}></textarea>
                </div>
                <div className="input-field">
                    <button className="btn blue lighten-1 z-depth-0">Create</button>
                </div>
            </form>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        auth : state.firebase.auth
    }
}
const MapStateToDispatch = (dispatch) =>{
    return {
        createProject : (project) => dispatch(createProject(project)) 
    }
}

export default connect(MapStateToProps, MapStateToDispatch)(CreateProject)
