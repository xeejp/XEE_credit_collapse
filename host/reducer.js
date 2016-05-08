const initialState = {
    started: false,
    experiment_type: "no_interaction",
    users: [],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_TYPE':
            return Object.assign({}, state, {
                started: false,
                experiment_type: action.experiment_type
            })
        case 'UPDATE_CONTENTS':
            return Object.assign({}, state, {
                started: action.started,
                experiment_type: action.experiment_type,
                users: action.users
            })
        case 'SET_USERS':
            return Object.assign({}, state, {
                users: action.users
            })
        case 'ADD_USER':
            var user = {}
            user[action.id] = action.user
            return Object.assign({}, state, {
                users: Object.assign({}, state.users, user)
            })
        case 'UPDATE_USER':
            var user = {}
            user[action.id] = action.user
            return Object.assign({}, state, {
                users: Object.assign({}, state.users, user)
            })
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
