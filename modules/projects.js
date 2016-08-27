import React from 'react';
import store from './store';
import { hashHistory } from 'react-router';

export default class Projects extends React.Component {
    constructor(props){
        super(props);
    }

    selectProject(project){
        store.setProject(project);
        hashHistory.push('/orgs');
    }

    render(){
        let m = this;
        let user = store.getUser();
        if(!user) hashHistory.push('/');
        else {
            if(user.mProjectInfoList&& user.mProjectInfoList.ProjectInfo){
                //只有一個專案, 直接設定, 轉置場域選擇
                if(!(user.mProjectInfoList.ProjectInfo.length > 1)){
                    store.setProject(user.mProjectInfoList.ProjectInfo);
                    hashHistory.push('/orgs');
                }
            }
        }

        return <div>
            <div className="project-title text-center">
                <h3>請選擇您欲開啟的專案</h3>
            </div>
            <div className="project-list text-center">
            {
                user.mProjectInfoList.ProjectInfo.length > 0?
                user.mProjectInfoList.ProjectInfo.map(function(project){
                    return <div onClick={m.selectProject.bind(m,project)}><h4>{project.ProjectName}</h4></div>;
                }):<div onClick={m.selectProject.bind(m,user.mProjectInfoList.ProjectInfo)}><h4>{user.mProjectInfoList.ProjectInfo.ProjectName}</h4></div>
            }
            </div>
        </div>;
    }
}