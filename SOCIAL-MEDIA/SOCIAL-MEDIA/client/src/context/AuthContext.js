import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user:null,
    isfetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider
        value = {{
            user:state.user,
            isfetching:state.isfetching,
            error:state.error,
            errorMessage:state.errorMessage,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}