import React from 'react'
import netlifyIdentity, { User } from 'netlify-identity-widget'
import GoTrue, { UserData } from 'gotrue-js'

const isBrowser = typeof window !== 'undefined'

export default function useAuth() {
    const auth = isBrowser ? new GoTrue() : null
    const [ user, setUser ] = React.useState<User | UserData | null>()

    const updateUserData = async (userData: any) => {
      const res = await auth?.currentUser()?.update(userData)
      if (res) {
        return await res.getUserData()
      }
      return null
    }

    const isLoggedIn = !!user

    const isConfirmedUser = () => !!user?.confirmed_at

    const requestPasswordRecovery = async (email: string) => {
      const res = await auth?.requestPasswordRecovery(email)
      if (res) {
        return "success"
      }
      return "error"
    }

    const settings = () => {
      return auth?.settings()
    }

    const login = () => {
      netlifyIdentity.open("login");
      netlifyIdentity.on("login", user => {
        setUser(user)
      })
    };

    const logout = () => {
      netlifyIdentity.logout();
      netlifyIdentity.on("logout", () => {
        setUser(null)
      })
    };

    const signup = () => {
      netlifyIdentity.open("signup");
    };


    return {
        login,
        logout,
        signup,
        user,
        updateUserData,
        isConfirmedUser,
        isLoggedIn,
        settings,
        requestPasswordRecovery,
    }
}