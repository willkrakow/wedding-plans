import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import { useIdentityContext } from 'react-netlify-identity';

export default function useAuth() {
    const { isLoggedIn, isConfirmedUser, user, updateUser, settings, requestPasswordRecovery } = useIdentityContext()

    const login = () => {
      netlifyIdentity.open("login");
    };

    const logout = () => {
      netlifyIdentity.logout();
      window.location.reload();
    };

    const signup = () => {
      netlifyIdentity.open("signup");
    };

    return {
        login,
        logout,
        signup,
        user,
        updateUser,
        isConfirmedUser,
        isLoggedIn,
        settings,
        requestPasswordRecovery,
    }
}