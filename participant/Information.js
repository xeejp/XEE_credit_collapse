import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ users, exitedUsers, started }) => {
    return {
        users,
        exitedUsers,
        started
    }
}

const Information = ({ users, exitedUsers, started }) => <div>
    {started
        ? <p>{users}人中{exitedUsers}人が退出しました。</p>
        : null
    }
</div>

export default connect(mapStateToProps)(Information)
