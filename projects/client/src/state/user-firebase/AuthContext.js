import React, { useContext } from "react";

const AuthContext = React.createContext();

export function AuthProvider({children, value}){
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthValue(){
    return useContext(AuthContext)
}

// The AuthProvider function allows us to share the value of the user’s state to all the children of AuthContext.Provider while useAuthValue allows us to easily access the value passed to AuthContext.Provider.