import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ users }) => {
    return {
        users
    }
}

const Status = ({ users }) => <div>
    {(() => {
        let exited = 0;
        const keys = Object.keys(users)
        keys.forEach((id) => {
            if (users[id] && users[id] != "punished") exited ++;
        })
        if (exited + 1 == keys.length) {
            return <p>{keys.length}人中、{exited}人が退出し、最後の1人が処罰されました。</p>
        }
        return <p>{keys.length}人中、{exited}人が退出しました</p>
    })()}
</div>

export default connect(mapStateToProps)(Status)
