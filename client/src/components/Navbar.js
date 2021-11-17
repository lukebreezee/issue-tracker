import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../redux/mapToProps';
import logo from '../images/star-trak-logo.png';

const NavbarComponent = props => {
        
    return (

        <nav>

            <ul>

                <Link to="/" >

                    <li>

                        <img className="nav-link" src={logo} alt="Star-Trak" id="logo" />

                    </li>

                </Link>

                <Link to="/tickets-admin-pm" className="link-component">

                    <li className="nav-link">Tickets</li>

                </Link>

                <Link to="/members-admin" className="link-component">

                    <li className="nav-link">Members</li>

                </Link>

                <Link to="/projects-admin-pm" className="link-component">

                    <li className="nav-link">Projects</li>

                </Link>

                <Link to="/notifs" className="link-component">

                    <li className="nav-link">Notifications</li>

                </Link>

                <Link to="/account" className="link-component">

                    <li className="nav-link">Account</li>

                </Link>

            </ul>

        </nav>

    );
}

const Navbar = connect(mapCredentials, mapDispatch)(NavbarComponent);

export { Navbar };