import Device from './utils/Device'
init_state = {
    global: 'init',
    testId: 0,
<<<<<<< HEAD
    scene: 0,
=======
    scene: 1,
>>>>>>> 56173b5a6de3d3383680d198f2f4295e498fedb6
    orientation : Device.orientation(),
    userrole : 'teacher',
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
        case 'EDIT_USERROLE':
            return {
                ...state,
                userrole: action.payload
            }
        default:
            return state
    }
}
