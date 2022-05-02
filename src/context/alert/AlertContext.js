import { createContext, useReducer } from "react";

import alertReducer from "./AlertReducer";


const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
    const initialState = {
        msg: '',
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    const setAlert = () => {
        dispatch({
            type: 'SET_ALERT',
            payload: 'You cannot leave it empty, type something please'
        })

        setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
    }



    return <AlertContext.Provider value={{ msg: state.msg, type: state.msg, setAlert }}>
        {children}
    </AlertContext.Provider>

}

export default AlertContext


