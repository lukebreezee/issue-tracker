const mapCredentials = state => {

    return {

        userInfo: state.root.userInfo,
        teamInfo: state.root.teamInfo

    }

}

const mapDispatch = dispatch => {

    return {

        userLogIn: userObj => {

            dispatch({ type: 'USER LOGIN', userObj });

        },

        userLogOut: () => {

            dispatch({type: 'USER LOGOUT'});

        },

        teamLogIn: username => {

            dispatch({ type: 'TEAM LOGIN', username });

        }

    };

};

export { mapCredentials, mapDispatch };