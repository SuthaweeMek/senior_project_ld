import Device from './utils/Device'
init_state = {
    global: 'init',
    testId: 0,
    scene: -1,
    orientation: Device.orientation(),
    userId: 0,
    scene: -1,
    userrole: 'teacher',
    firstname: 'Pending'
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
        case 'EDIT_USERID':
            return {
                ...state,
                userId: action.payload,
            }
        case 'EDIT_USERROLE':
            return {
                ...state,
                userrole: action.payload
            }
        case 'EDIT_NAME':
            return {
                ...state,
                firstname: action.payload
            }
        default:
            return state
    }
}
