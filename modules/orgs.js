import React from 'react';
import store from './store';
import { hashHistory } from 'react-router';

export default class Orgs extends React.Component {
    constructor(props){
        super(props);
    }

    selectOrg(org){
        store.setOrg(org);
        hashHistory.push('/list');
    }

    render(){
        let m = this;
        let user = store.getUser();
        if(!user) hashHistory.push('/');

        let project = store.getProject();
        if(!project) hashHistory.push('/projects');
        else {
            if(!(project.ProjectOwnership.OwnershipInfo.Ownership.length > 1)){
                store.setOrg(project.ProjectOwnership.OwnershipInfo.Ownership);
                hashHistory.push('/list');
            }
        }

        return <div>
            <div className="project-title text-center">
                <h3>請選擇您的場域</h3>
            </div>
            <div className="project-list text-center">
            {
                project.ProjectOwnership.OwnershipInfo.Ownership.length > 0?
                project.ProjectOwnership.OwnershipInfo.Ownership.map(function(org){
                    return <div onClick={m.selectOrg.bind(m,org)}><h4>{org.Org}</h4></div>;
                }):<div onClick={m.selectOrg.bind(m,project.ProjectOwnership.OwnershipInfo.Ownership)}>
                    <h4>{project.ProjectOwnership.OwnershipInfo.Ownership.Org}</h4></div>
            }
            </div>
        </div>;
    }
}