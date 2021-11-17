import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mapCredentials, mapDispatch } from '../../redux/mapToProps';
import Button from 'react-bootstrap/Button';

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
    
    return (

        <div>

            <div>My Projects</div>

            <div className="scrolling-list">
            
                {

                    userProjects.map((obj, index) => {           

                        return (

                            <div

                                key={index}
                                onClick={() => handleClick(obj.projectName)}
                                
                            >

                                {obj.projectName} {obj.selectedMembers.length}

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

};

const MyProjects = connect(mapCredentials, mapDispatch)(MyProjectsComponent);

export { MyProjects };