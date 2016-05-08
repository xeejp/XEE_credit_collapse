import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExitButton from './ExitButton'
import Information from './Information'

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
            <Information />
            <ExitButton />
        </div>
    }
}

export default connect()(App)
