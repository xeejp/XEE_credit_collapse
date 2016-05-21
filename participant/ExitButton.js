import React from 'react'
import { connect } from 'react-redux'

import moment from 'moment'

import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ({ started, started_time, answered, punished }) => {
    return {
        started,
        started_time,
        answered,
        punished
    }
}

function exit(dispatch, started_time) {
    let time = moment();
    dispatch({type: 'ANSWER'});
    sendData("exit", { time, startedTime: started_time });
}

const ExitButton = ({ started, started_time, dispatch, answered, punished }) => started && !punished && !answered
? <RaisedButton
    label="退出する"
    onClick={exit.bind(null, dispatch, started_time)}
/>
: null

export default connect(mapStateToProps)(ExitButton)
