import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ users, exitedUsers, started, punished }) => {
    return {
        users,
        exitedUsers,
        started,
        punished
    }
}

const Information = ({ users, exitedUsers, started, punished }) => <div>
    {punished
        ? <p>あなたは最後の一人だったため処罰を受けました</p>
        : started
            ? <p>{users}人中{exitedUsers}人が退出しました。</p>
            : null
    }
</div>

export default connect(mapStateToProps)(Information)
