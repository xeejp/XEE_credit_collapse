import React from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

const UsersList = ({ users }) => (
  <Card>
    <CardHeader
      title="参加者"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText
      expandable={true}
    >
      <List>
        {Object.keys(users).map((id) => <ListItem
          key={id}
          primaryText={id}
          secondaryText={
            users[id]
              ? (users[id] == "punished" ? "punished" : "exited")
              : "not exited"
          }
        />)}
      </List>
    </CardText>
  </Card>
)

export default connect(mapStateToProps)(throttle(UsersList, 200))
