import moment from 'moment'

const initialState = {
    started: false,
    started_time: null,
    answerd: false,
    program: [], // list of times computer will leave
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_TYPE':
            return Object.assign({}, state, {
                started: false,
                experiment_type: action.experiment_type
            })
        case 'UPDATE_CONTENTS':
            return {
                experiment_type: action.experiment_type,
                started: action.started,
                answerd: action.answerd
            }
        case 'START':
            return Object.assign({}, state, {
                started: true
            })
        case 'STOP':
            return Object.assign({}, state, {
                started: false
            })
        default:
            return state
    }
}

export default reducer
