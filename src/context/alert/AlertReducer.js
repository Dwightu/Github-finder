


const alertReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALERT':
            return {
                msg: action.payload,

            }
        case 'REMOVE_ALERT':
            return {
                msg: '',
            }
        default:
            return state
    }
}

export default alertReducer



