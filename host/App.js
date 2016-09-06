import React, { Component } from 'react'
import { connect } from 'react-redux'

import UsersList from './UsersList'
import TypesList from './TypesList'
import StartButton from './StartButton'
import ExitButton from './ExitButton'
import Status from './Status'
import LimitEditor from './LimitEditor'
import CSV from './CSV'

import Chart from './Chart'

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
      <ExitButton />
      <LimitEditor />
      <TypesList />
      <Status />
      <CSV />
      <UsersList />
      <Chart />
    </div>
  }
}

export default App
