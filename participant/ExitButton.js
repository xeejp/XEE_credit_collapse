import React from 'react'
import { connect } from 'react-redux'

import moment from 'moment'

import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ({ started, answered, punished, exitedUsers, prize }) => {
    return {
        started,
        answered,
        punished,
        exitedUsers,
        prize
    }
}

function exit(dispatch, exitedUsers, prize) {
    let time = moment();
    dispatch({type: 'ANSWER', time, prize});
    sendData("exit", { time, exitedUsers, prize });
}

const ExitButton = ({ started, dispatch, answered, punished, exitedUsers, prize }) => started && !punished && !answered
? <RaisedButton
    label="退出する"
    onClick={exit.bind(null, dispatch, exitedUsers, prize)}
/>
: null

export default connect(mapStateToProps)(ExitButton)
