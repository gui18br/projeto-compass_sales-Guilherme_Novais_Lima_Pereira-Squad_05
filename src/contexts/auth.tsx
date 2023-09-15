import React, { ReactNode, createContext, useState } from "react";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    users: User[];
    name: string;
    createUser: (name: string, email: string) => void;
    logUser: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
    children: ReactNode
}

function AuthProvider({children}: AuthProviderProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');

    function createUser(newName: string, newEmail: string) {
        if (newName !== '' && newEmail !== '') {
            const newUser: User = {
                name: newName,
                email: newEmail
            };
            setUsers([...users, newUser]);
            setName(newName)
        }
    }

    function logUser(newEmail: string) {
        if (newEmail !== '') {
            const foundUser = users.find(user => user.email === newEmail);
            if (foundUser) {
                setName(foundUser.name)
            }
        }
        return undefined;
    }

    const contextValue: AuthContextType = {
        users,
        name,
        createUser,
        logUser,
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;