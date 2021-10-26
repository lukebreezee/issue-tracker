import React from 'react';
export { NavButton };

class NavButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="nav-button">{this.props.label}</div>
        );
    }
}