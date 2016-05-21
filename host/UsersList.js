import React from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'

const mapStateToProps = ({ users }) => {
    return {
        users
    }
}

const UsersList = ({ users }) => <List>
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

export default connect(mapStateToProps)(UsersList)
