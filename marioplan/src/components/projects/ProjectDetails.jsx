import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase' 
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import moment from 'moment'

function ProjectDetails(props) {
    // console.log(props)
    const {project, auth} = props;
    if (!auth.uid) return <Redirect to='/signin'/>
    if (project){
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Project Title - {project.title}</span>
                        <p>{project.content}</p>               
                    </div>
                    <div className="card-action gret lighten-4 grey-text">
                            <div>Posted By {project.authorFirstname} {project.authorLastname}</div>
                            <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>  
                </div>
            </div>
        )
    }

    return (
        <div className="container section project-details">
            <p>Loading Project ....</p>
        </div>
    )

}

const MapStateToProp = (state, ownProps) =>{
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null
    // console.log(project)
    return {
        project: project,
        auth: state.firebase.auth
    }
}

// firestoreConnect is for fetching details from a particular collection we have created
export default compose(
    connect(MapStateToProp),
    firestoreConnect([
        { collection : 'projects'}
    ]
    ),
)(ProjectDetails)
