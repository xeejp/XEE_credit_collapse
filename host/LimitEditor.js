import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

const mapStateToProps = ({ experiment_type, limit }) => {
  return {
    experiment_type,
    limit
  }
}

class LimitEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.limit
    }
  }
  change(event) {
    const value = event.target.value
    this.setState(Object.assign({}, this.state, { value }))
  }

  update() {
    this.props.dispatch({type: 'UPDATE_LIMIT', limit: parseInt(this.state.value, 10)})
  }

  render() {
    const { experiment_type } = this.props
    return <div>
      <TextField
        value={this.state.value}
        onChange={this.change.bind(this)}
      />
      <FlatButton
        label="Update"
        onClick={this.update.bind(this)}
      />
    </div>
  }
}

export default connect(mapStateToProps)(LimitEditor)
