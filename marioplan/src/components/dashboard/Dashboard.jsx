import React from 'react'
import Notification from './Notification'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'


class Dashboard extends React.Component {
    render(){
        const { projects, auth, notifications } = this.props;

        if (!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notification notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const MapStateToProp = (state) =>{
    // console.log(state)
    return {
        projects : state.firestore.ordered.projects,
        notifications : state.firestore.ordered.notifications,
        auth: state.firebase.auth
    }
}
// The firestoreConnect connects us to the collections which are passed down as props for other components
export default compose(
    firestoreConnect([
        { collection : 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ]),
    connect(MapStateToProp)
)(Dashboard)
