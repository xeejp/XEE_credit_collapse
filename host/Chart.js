import React from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { addLog } from './actions'

import HighCharts from 'react-highcharts'
import RaisedButton from 'material-ui/RaisedButton'

function usersToData(name, users) {
  const data = [[0, 0]]
  Object.keys(users).map(key => {
    const user = users[key]
    if (user && user.prize) {
      data.push([user.prize, user.exitedUsers + 1])
    }
  })
  data.sort(([a], [b]) => a - b)
  return {
    animation: false,
    name,
    data
  }
}

const actionCreators = { addLog }

const mapStateToProps = ({ users, log }) => {
  const series = []
  series.push(usersToData("現在進行中のゲーム", users))
  log.forEach(old => series.push(usersToData("過去のデータ", old)))
  const config = {
    chart: {
      animation: false
    },
    title: {
      text: '退席ゲーム',
    },
    xAxis: {
      title: {
        text: '報酬(ポイント)'
      },
      allowDecimals: false
    },
    yAxis: {
      title: {
        text: '人数(人)'
      },
      allowDecimals: false
    },
    series
  }
  return {
    config
  }
}

const Chart = ({ config, addLog }) => (
  <div>
    <HighCharts config={config} />
    <RaisedButton
      label="現在の実験情報を保存する"
      onClick={addLog}
    />
  </div>
)

export default connect(mapStateToProps, actionCreators)(throttle(Chart, 200))
