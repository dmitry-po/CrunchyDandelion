import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [isSigned, setIsSigned] = useState(false);
    const [userName, setUserName] = useState('');
    
    const login = (loginName) => {
        console.log(`Loged in as ${loginName}`);
        setUserName(loginName);
        setIsSigned(true);
    }

    return (
        <AuthContext.Provider value={{isSigned, userName, login}}>
            { props.children }
        </AuthContext.Provider>
    )
    
}

export { AuthContext, AuthContextProvider };