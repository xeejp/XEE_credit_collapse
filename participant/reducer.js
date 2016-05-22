import moment from 'moment'

const initialState = {
    users: 0,
    exitedUsers: 0,
    started: false,
    started_time: null,
    answered: false,
    punished: false,
    program: [], // list of times computer will leave
    prize: 0,
    receivedPrize: 0
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_PRIZE':
            return Object.assign({}, state, {
                prize: action.prize
            })
        case 'ANSWER':
            return Object.assign({}, state, {
                answered: true,
                receivedPrize: action.prize
            })
        case 'CHANGE_TYPE':
            return Object.assign({}, state, {
                started: false,
                started_time: moment(),
                experiment_type: action.experiment_type
            })
        case 'UPDATE_CONTENTS':
            return Object.assign({}, state, {
                experiment_type: action.experiment_type,
                started: action.started,
                answered: action.answered,
                punished: action.punished,
                users: action.users,
                exitedUsers: action.exited_users,
                prize: action.prize,
                receivedPrize: action.received_prize
            })
        case 'UPDATE_USERS':
            return Object.assign({}, state, {
                users: action.users,
                exitedUsers: action.exited_users
            })
        case 'START':
            return Object.assign({}, state, {
                started: true,
                answered: false,
                punished: false,
                started_time: moment(),
                users: action.users,
                exitedUsers: action.exited_users
            })
        case 'STOP':
            return Object.assign({}, state, {
                started: false
            })
        case 'PUNISHED':
            return Object.assign({}, state, {
                punished: true
            })
        default:
            return state
    }
}

export default reducer
