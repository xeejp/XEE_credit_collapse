import React from 'react'
import { connect } from 'react-redux'

import moment from 'moment'

import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ({ started, started_time }) => {
    return {
        started,
        started_time
    }
}

function exit(dispatch, started_time) {
    let time = 0 // TODO take diff of 
    dispatch({type: 'ANSWER'})
    sendData("exit", { time })
}

const ExitButton = ({ started, started_time, dispatch }) => started && !answered
? <RaisedButton
    label="退出する"
    onClick={exit.bind(null, dispatch, started_time)}
/>
: null

export default connect(mapStateToProps)(ExitButton)
