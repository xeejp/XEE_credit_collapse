import React, { Component } from 'react'
import { connect } from 'react-redux'

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
        </div>
    }
}

export default connect()(App)
