import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ users, exitedUsers, started, punished, answered, prize, receivedPrize }) => {
    return {
        users,
        exitedUsers,
        started,
        punished,
        answered,
        prize,
        receivedPrize
    }
}

const Information = ({ users, exitedUsers, started, punished, answered, prize, receivedPrize }) => <div>
    {
    }
    {punished
        ? <p>あなたは最後の一人だったため処罰を受けました</p>
        : started
            ? <div>
                {
                    !answered && !punished
                        ? <p>現在の報酬は{prize}です。</p>
                        : <p>あなたは{receivedPrize}の報酬を得ました。</p>
                }
                <p>{users}人中{exitedUsers}人が退出しました。</p>
            </div>
            : null
    }
</div>

export default connect(mapStateToProps)(Information)
