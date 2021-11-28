/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapCredentials, mapDispatch } from '../redux/mapToProps';
import logo from '../images/star-trak-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell } from '@fortawesome/free-solid-svg-icons';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

const NavbarDefaultMarkup = (

    <nav>

        <ul>


            <li>

                <img className="nav-link" src={logo} alt="Star-Trak" id="logo" />

            </li>


            <Link to="/tickets-admin-pm" className="link-component">

                <li className="nav-link">Tickets</li>

            </Link>

            <Link to="/members-admin" className="link-component">

                <li className="nav-link">Members</li>

            </Link>

            <Link to="/projects-admin-pm" className="link-component">

                <li className="nav-link">Projects</li>

            </Link>

            <div />

            <Link to="/notifs" className="link-component">

                {/* <li className="nav-link">Notifications</li> */}

                <FontAwesomeIcon icon={faBell} className="nav-icon" />

            </Link>

            <Link to="/account" className="link-component">

                <FontAwesomeIcon icon={faCog} className="nav-icon" />

            </Link>

        </ul>

    </nav>

);

const NavbarPhoneMarkup = (

    <nav>

        <ul>

            <Dropdown>

                <Dropdown.Toggle variant="secondary" id="dropdown-basic">

                    <FaBars />

                </Dropdown.Toggle>

                <Dropdown.Menu>

                    <Dropdown.Item href="#">
                        
                        <Link to="/tickets-admin-pm" className="link-component">

                            Tickets

                        </Link>

                    </Dropdown.Item>

                    <Dropdown.Item href="#">
                        
                        <Link to="/members-admin" className="link-component">

                            Members

                        </Link>
                        
                    </Dropdown.Item>

                    <Dropdown.Item href="#">
                        
                        <Link to="/projects-admin-pm" className="link-component">

                            Projects

                        </Link>
                        
                    </Dropdown.Item>

                    <Dropdown.Item href="#">
                        
                        <Link to="/account" className="link-component">

                            Account

                        </Link>
                        
                    </Dropdown.Item>

                </Dropdown.Menu>

            </Dropdown>

            <li>

                <img className="nav-link" src={logo} alt="Star-Trak" id="logo" />

            </li>

            <Link to="/notifs" className="link-component">

                <FontAwesomeIcon icon={faBell} className="nav-icon" />

            </Link>

        </ul>

    </nav>

);

const NavbarComponent = props => {

    const [render, setRender] = useState(NavbarDefaultMarkup);

    useEffect(() => {

        if (window.innerWidth > 700) {
            
            setRender(NavbarDefaultMarkup);
        
        } else {
            
            setRender(NavbarPhoneMarkup);
        
        }

    }, []);

    window.addEventListener('resize', () => {

        if (window.innerWidth > 700) {
            
            setRender(NavbarDefaultMarkup);

            return;
        
        }

        setRender(NavbarPhoneMarkup);

    });
        
    return render;
}

const Navbar = connect(mapCredentials, mapDispatch)(NavbarComponent);

export { Navbar };