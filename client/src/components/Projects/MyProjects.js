import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';

const MyProjectsComponent = props => {

    const userProjects = props.teamInfo.projects.filter(obj => {

        const members = [...obj.members];

        if (members.indexOf(props.userInfo.username) !== -1) {

            return true;

        }

        return false;

    });
    
    return (

        <div>

            <div>My Projects</div>

            <div className="scrolling-list">
            
                {

                    userProjects.map(obj => {           

                        return (

                            <div>

                                {obj.name} {obj.members.length}

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

};

const MyProjects = connect(mapCredentials)(MyProjectsComponent);

export { MyProjects };