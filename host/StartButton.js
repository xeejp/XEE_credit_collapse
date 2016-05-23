import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ({ started }) => {
  return {
    started
  }
}

function stop() {
  sendData("stop")
}

function start() {
  sendData("start")
}

const UsersList = ({ started, dispatch }) => started
  ? <RaisedButton
    label="Stop"
    onClick={stop}
  />
  : <RaisedButton
    label="Start"
    onClick={start.bind(null, dispatch)}
  />

export default connect(mapStateToProps)(UsersList)
