import React from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = ({ exited }) => {
    return {
        exited
    }
}

function exit() {
    sendData("exit")
}

const UsersList = ({ exited }) => 
    <RaisedButton
        label="Exit"
        onClick={exit}
    />

export default connect(mapStateToProps)(UsersList)
