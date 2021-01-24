import Device from './utils/Device'
init_state = {
    global: 'init',
    testId: 0,
    scene: 1,
    orientation : Device.orientation(),
}

export default Reducer = (state = init_state, action) => {
    switch (action.type) {
        case 'EDIT_GLOBAL':
            return {
                ...state,
                global: action.payload
            }
        case 'EDIT_SCENE':
            return {
                ...state,
                scene: action.payload
            }
        case 'EDIT_TESTID':
            return {
                ...state,
                testId: action.payload
            }
        case 'EDIT_ORIENTATION':
            return {
                ...state,
                orientation: action.payload
            }
        default:
            return state
    }
}
