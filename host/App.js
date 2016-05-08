import React, { Component } from 'react'
import { connect } from 'react-redux'

import UsersList from './UsersList'
import TypesList from './TypesList'
import StartButton from './StartButton'

const mapStateToProps = ({}) => {
    return {
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        sendData('fetchContents')
    }

    render() {
        return <div>
            <StartButton />
            <TypesList />
            <UsersList />
        </div>
    }
}

export default connect()(App)
