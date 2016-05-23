import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ users, exitedUsers, started, punished, answered, prize, receivedPrize }) => {
    return {
        users, exitedUsers, started, punished, answered, prize, receivedPrize
    }
}

const Status = ({ users, exitedUsers, started, punished, answered, prize, receivedPrize }) => <div>
    {
        <p>現在の報酬は{prize}です。</p>
    }
    {(() => {
        let exited = 0;
        const keys = Object.keys(users)
        keys.forEach((id) => {
            if (users[id] && users[id] != "punished") exited ++;
        })
        if (exited + 1 == keys.length) {
            return <p>{keys.length}人中、{exited}人が退出し、最後の1人が処罰されました。</p>
        }
        return <p>{keys.length}人中、{exited}人が退出しました。（管理者による退出：{exitedUsers}人）</p>
    })()}
</div>

export default connect(mapStateToProps)(Status)
