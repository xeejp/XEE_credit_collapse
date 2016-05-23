import React from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField'

const mapStateToProps = ({ started, users }) => {
  return {
    started,
    users
  }
}

function jsonToCsv(json, header, func) {
  if (json == null || typeof(json) != 'object') return '';
  var body = Object.keys(json).map(function(key) {
    return func(key, json[key]).join(",");
  }).join("\r\n");
  return header+ "\r\n" + body;
}

const UsersList = ({ started, users }) => started
  ? null
  : <Card>
    <CardHeader
      title="CSV Log"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <TextField id="csv" fullWidth={true} multiLine={true} value={
        jsonToCsv(users,
          ["id", "time", "prize", "exitedUsers"],
          (id, row) => {
            let ret = [id];
            if (row != "punished")
            {
              Object.keys(row).forEach((v, key) => { ret.push(row[v]) })
            } else {
              ret.push("punished","punished","punished")
            }
            return ret;
          })}
      />
    </CardText>
  </Card>

export default connect(mapStateToProps)(UsersList)
