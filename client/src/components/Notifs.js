import { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapCredentials } from '../redux/mapToProps';
import { useHistory } from 'react-router-dom';

const NotifsComponent = props => {

    let history = useHistory();


        if (!props.userInfo.username) {
            
            history.push('/login');

            return null;
        
        }

        if (!props.userInfo.teamUsername) {
            
            history.push('/team-login');

            return null;
        
        }

    
    return (

        <div className="notification-page-parent">

            <h3>Notifications</h3>

            {

                props.userInfo.notifications.slice(0).reverse().map(elem => {

                    return (

                        <div>

                            <hr />
                    
                            <div className="notification-div">{elem}</div>

                        </div>
                        
                    )

                })

            }

        </div>

    );

};

const Notifs = connect(mapCredentials)(NotifsComponent);

export { Notifs };