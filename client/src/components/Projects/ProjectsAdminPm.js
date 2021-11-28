import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import { MyProjects } from './MyProjects';
import { useHistory } from 'react-router-dom';
import { getTeamInfo } from '../../helpers';
import { useEffect, useState } from 'react';

const ProjectsAdminPmComponent = props => {

    let history = useHistory();

    const [returnStatement, setReturnStatement] = useState(null);

    let componentBody = (

        <div className="main-page-parent">

            <MyProjects role="admin-pm" />

        </div>

    );

    useEffect(() => {

        if (!props.userInfo.username) {
    
            return history.push('/login');
    
        }

        if (!props.userInfo.teamUsername) {

            return history.push('/team-login');
    
        }

        if (props.teamInfo.username) {
            
            setReturnStatement(componentBody);

            return;
        
        }

        getTeamInfo()

        .then(res => {

            props.teamInfoUpdate(res);

            const memberObj = res.members.find(elem => 
            
                elem.username === props.userInfo.username
                
            );
        
            if (memberObj.role === 'dev') {
        
                return history.push('/projects-dev');
        
            }

            setReturnStatement(componentBody);

        })

        .catch(err => {

            console.log(`Projects Admin Pm Error: ${err.message}`);

        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
        
    return returnStatement;

};

const ProjectsAdminPm = connect(mapCredentials, mapDispatch)(ProjectsAdminPmComponent);

export { ProjectsAdminPm };