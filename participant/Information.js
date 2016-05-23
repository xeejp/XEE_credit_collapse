import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ users, exitedUsers, started, punished, answered, prize, receivedPrize, experiment_type }) => {
    return {
        users,
        exitedUsers,
        started,
        punished,
        answered,
        prize,
        receivedPrize,
        experiment_type
    }
}

const Information = ({ users, exitedUsers, started, punished, answered, prize, receivedPrize, experiment_type }) => <div>
    {punished
        ? <p>あなたは最後の一人だったため、報酬がゼロになりました。</p>
        : started
            ? <div>
                {
                    !answered && !punished
                        ? <p>現在の報酬は{prize}です。</p>
                        : <p>あなたは{receivedPrize}の報酬を得ました。</p>
                }
                {experiment_type == "interaction_without_information"
                  ? null
                  : <p>{users}人中{exitedUsers}人が退出しました。</p>
                }
            </div>
            : <div>
                <p>実験開始までしばらくお待ち下さい。</p>
              </div>
    }
</div>

export default connect(mapStateToProps)(Information)
