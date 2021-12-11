import React from 'react'

interface INetlifyAuth {
    isLoggedIn: boolean;
    user: any;
    login: () => void;
    logout: () => Promise<void>;
    signup: () => void;
    updateUserData: (data: any) => Promise<void>;
    requestPasswordReset: (email: string) => void;
}

export const NetlifyAuthContext = React.createContext<INetlifyAuth>({
    isLoggedIn: false,
    user: null,
    login: () => {},
    logout: async () => {},
    signup: () => {},
    updateUserData: async () => {},
    requestPasswordReset: () => {},
});


export const NetlifyAuthProvider = NetlifyAuthContext.Provider
export const NetlifyAuthConsumer = NetlifyAuthContext.Consumer