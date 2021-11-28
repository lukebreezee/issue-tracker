import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

const MyProjectsComponent = props => {

    let history = useHistory();

    const userProjects = props.teamInfo.projects.filter(obj => {

        const members = [...obj.selectedMembers];

        if (members.indexOf(props.userInfo.username) !== -1) {

            return true;

        }

        if (obj.creator === props.userInfo.username) return true;

        return false;

    });

    const handleClick = projectName => {

        console.log(projectName);

        props.currentProjectUpdate(projectName);

        history.push('/view-project')

    };

    let CreateProjectButton;

    if (props.role !== 'dev') {

        CreateProjectButton = (

            <Button variant="primary" onClick={() => history.push('/create-project')}>
                
                Create New Project
                
            </Button>

        );

    } else {

        CreateProjectButton = null;

    }

    const findCreatorName = creatorUsername => {

        const creatorInfo = 
        
            props.teamInfo.members.find(obj => obj.username === creatorUsername);

        return `${creatorInfo.firstName} ${creatorInfo.lastName}`;

    };

    const findTicketCount = projectName => {

        return props.teamInfo.tickets.reduce((acc, obj) => {

            if (obj.projectName === projectName) {

                acc++;

            }

            return acc;

        }, 0);

    };

    const MyProjectsDefaultMarkup = (

        <div>
    
            <h3>My Projects</h3>
    
            <div className="project-list-headers">
    
                <div className="scrolling-list-div-left"><u>Name</u></div>
    
                <div><u># People</u></div>
    
                <div><u>Created By</u></div>
    
                <div><u>Priority</u></div>
    
                <div><u># Tickets</u></div>
    
                <div><u>Date</u></div>
    
            </div>
    
            <div className="scrolling-list-medium" id="my-projects-list">
            
                {
    
                    userProjects.map((obj, index) => {           
    
                        return (
    
                            <div
    
                                key={index}
                                onClick={() => handleClick(obj.projectName)}
                                className="project-list-div"
                                
                            >
    
                                <div className="scrolling-list-div-left">{obj.projectName}</div>
    
                                <div>{obj.selectedMembers.length}</div>
    
                                <div>{findCreatorName(obj.creator)}</div>
    
                                <div>{obj.priority}</div>
    
                                <div>{findTicketCount(obj.projectName)}</div>
    
                                <div className="scrolling-list-div-right">{obj.date.slice(4, 15)}</div>
    
                            </div>
    
                        );
    
                    })
    
                }
    
            </div>
    
            <br />
    
            {
    
                CreateProjectButton
    
            }
    
        </div>
    
    );

    const MyProjectsPhoneMarkup = (

        <div>
    
            <h3>My Projects</h3>
    
            <div className="scrolling-list-medium" id="my-projects-list">
            
                {
    
                    userProjects.map((obj, index) => {           
    
                        return (
    
                            <div
    
                                key={index}
                                onClick={() => handleClick(obj.projectName)}
                                className="project-list-div"
                                
                            >
    
                                <div className="scrolling-list-div-left">{obj.projectName}</div>
    
                            </div>
    
                        );
    
                    })
    
                }
    
            </div>
    
            <br />
    
            {
    
                CreateProjectButton
    
            }
    
        </div>

    );

    const [render, setRender] = useState(MyProjectsDefaultMarkup);

    useEffect(() => {

        if (window.innerWidth > 700) {
            
            setRender(MyProjectsDefaultMarkup);
        
        } else {
            
            setRender(MyProjectsPhoneMarkup);
        
        }

    }, []);

    window.addEventListener('resize', () => {

        if (window.innerWidth > 700) {
            
            setRender(MyProjectsDefaultMarkup);

            return;
        
        }

        setRender(MyProjectsPhoneMarkup);

    });
    
    return render;

};

const MyProjects = connect(mapCredentials, mapDispatch)(MyProjectsComponent);

export { MyProjects };