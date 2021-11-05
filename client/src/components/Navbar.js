import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../redux/mapToProps';
import axios from 'axios';

const NavbarComponent = props => {

    let history = useHistory();

    const handleLogOut = () => {

        props.userLogOut();

        history.push('/login');

    };

    const handleTeamLogOut = () => {

        axios.post('http://localhost:5000/delete-member', {

            teamUsername: props.userInfo.teamUsername,
            username: props.userInfo.username

        });

        axios.put('http://localhost:5000/update-user', {

            username: props.userInfo.username,
            key: 'teamUsername',
            updateValue: null

        });

        props.teamLogOut();

    }
        
    return (

        <nav>

            <ul>

                <Link to="/" >

                    <li className="nav-link">Issue Tracker</li>

                </Link>

                <Link to="/tickets-admin-pm">

                    <li className="nav-link">Tickets</li>

                </Link>

                <Link to="/members-admin" >

                    <li className="nav-link">Members</li>

                </Link>

                <Link to="/projects-admin-pm" >

                    <li className="nav-link">Projects</li>

                </Link>

                <Link to="/notifs" >

                    <li className="nav-link">Notifications</li>

                </Link>

                <Link to="/account" >

                    <li className="nav-link">Account</li>

                </Link>

                <Link to="/login">

                    <li className="nav-link">Login</li>

                </Link>

                <Link to ="/team-login">

                    <li className="nav-link">Team Login</li>

                </Link>

                <button onClick={() => handleLogOut()}>Log Out</button>

                <button onClick={() => handleTeamLogOut()}>Leave Team</button>

            </ul>

        </nav>

    );
}

const Navbar = connect(mapCredentials, mapDispatch)(NavbarComponent);

export { Navbar };