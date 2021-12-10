import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import { useIdentityContext } from 'react-netlify-identity';
import GoTrue from 'gotrue-js'

const isBrowser = typeof window !== 'undefined'

export default function useAuth() {
    const { isLoggedIn, isConfirmedUser, user, updateUser, settings, requestPasswordRecovery } = useIdentityContext()

    const auth = isBrowser ? new GoTrue() : null

    const updateUserData = async (userData) => {
      const res = await auth?.currentUser()?.update(userData)
      if (res) {
        return await res.getUserData()
      }
      return null
    }

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
        updateUserData,
        isConfirmedUser,
        isLoggedIn,
        settings,
        requestPasswordRecovery,
    }
}