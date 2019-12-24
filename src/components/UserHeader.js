import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/index'


class UserHeader extends React.Component {
    componentDidMount() {
        this.props.fetchUsers(this.props.userId)
    }

    render() {
        const user = this.props.users.find(user => user.id === this.props.userId)

        if (!user) {
            return null;
        }

        return (
            <div className="header">
                {user.username}
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUsers })(UserHeader);