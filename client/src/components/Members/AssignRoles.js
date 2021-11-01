import { connect } from 'react-redux';
import { mapCredentials } from '../../redux/mapToProps';
import { useState } from 'react';
import { getTeamInfo } from '../../helpers';
import axios from 'axios';

const AssignRolesComponent = props => {

    const [selectedMemberUsername, setSelectedMemberUsername] = useState('');

    const handleClick = (e, username) => {

        let color = e.target.style.backgroundColor;

        if (color === '') {

            let current = document.querySelector(`div[username='${selectedMemberUsername}']`);

            if (current) current.style.backgroundColor = '';

            e.target.style.backgroundColor = '#CCCCCC';

            setSelectedMemberUsername(username);

        } else {

            e.target.style.backgroundColor = '';

            setSelectedMemberUsername('');

        }

    };

    const handleAssign = () => {

        let alert = document.getElementById('assign-submit-status');

        let role = document.getElementById('assign-role-select');

        if (selectedMemberUsername === '') {

            alert.innerHTML = 'A user must be selected';
            return;

        }

        if (role.value === 'Role') {

            alert.innerHTML = 'A role must be selected';
            return;

        }

        if (selectedMemberUsername === props.userInfo.username
            && role.value !== 'admin') {

            const isExtraAdmin = props.teamInfo.members.reduce((acc, obj) => {

                if (obj.role === 'admin' 
                    && obj.username !== selectedMemberUsername) {

                        return true;

                } else {

                    return acc;

                }

            }, false);

            if (!isExtraAdmin) {

                alert.innerHTML = 'Another admin must exist to change your role';
                return;

            }

        }

        axios.post('http://localhost:5000/assign-role', {

            teamUsername: props.userInfo.teamUsername,
            username: selectedMemberUsername,
            role: role.value,

        }).then(res => {

            alert.innerHTML = res.data.message;

            if (res.data.message === 'Success') {

                getTeamInfo();

            }

        });

    };
    
    return (

        <div>

            <div>Assign Roles</div>

            <div className="scrolling-list" id="assign-roles-list">
                
                {

                    props.teamInfo.members.map((obj, index) => {

                        return <div
                                onClick={e => handleClick(e, obj.username)}
                                key={index}
                                className="assign-roles-button"
                                username={obj.username}
                                >

                                    {obj.firstName} {obj.lastName} ({obj.role})

                                </div>

                    })
                
                }

            </div>

            <select id="assign-role-select">

                <option>Role</option>

                <option>admin</option>

                <option>project manager</option>

                <option>dev</option>

            </select>

            <button onClick={() => handleAssign()}>Assign</button>

            <p id="assign-submit-status"></p>

        </div>

    );

};

const AssignRoles = connect(mapCredentials)(AssignRolesComponent);

export { AssignRoles };