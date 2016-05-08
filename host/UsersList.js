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
    />)}
</List>

export default connect(mapStateToProps)(UsersList)
