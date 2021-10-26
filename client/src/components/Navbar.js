import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDispatch } from '../redux/mapToProps';

const NavbarComponent = props => {

    let history = useHistory();

    const handleLogOut = () => {

        props.userLogOut();

        history.push('/login');

    };
        
    return (

        <nav>

            <ul>

                <Link to="/" >

                    <li className="nav-link">Issue Tracker</li>

                </Link>

                <Link to="/tickets">

                    <li className="nav-link">Tickets</li>

                </Link>

                <Link to="/users" >

                    <li className="nav-link">Users</li>

                </Link>

                <Link to="/projects" >

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

            </ul>

        </nav>

    );
}

const Navbar = connect(null, mapDispatch)(NavbarComponent);

export { Navbar };