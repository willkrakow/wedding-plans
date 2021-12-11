import React from 'react'
import netlifyIdentity, { User } from 'netlify-identity-widget'
import GoTrue, { UserData } from 'gotrue-js'

const isBrowser = typeof window !== 'undefined'

export default function useAuth() {
    const [ user, setUser ] = React.useState<User | UserData | null>()
    const [ auth, setAuth] = React.useState<GoTrue | null>(null)
    const [ isLoggedIn, setIsLoggedIn ] = React.useState<boolean>(false)

    const updateUserData = async (userData: any) => {
      const res = await auth?.currentUser()?.update(userData)
      if (res) {
        return await res.getUserData()
      }
      return null
    }

    const isConfirmedUser = () => !!user?.confirmed_at

    const requestPasswordRecovery = async (email: string) => {
      const res = await auth?.requestPasswordRecovery(email)
      if (res) {
        return "success"
      }
      return "error"
    }

    React.useEffect(() => {
      if (!isBrowser) {
        return
      }

      netlifyIdentity.on("login", (user) => {
        setUser(user);
        setIsLoggedIn(true);
      });

      netlifyIdentity.on("logout", () => {
        setUser(null);
        setIsLoggedIn(false);
        window.location.reload()
      });

      if (!auth) {
        const gotrue = new GoTrue()
        setAuth(gotrue)
      }

      if (auth?.currentUser()){
        setUser(auth.currentUser())
      }
      return () => {
        netlifyIdentity.off("login")
        netlifyIdentity.off("logout")
      }
    }, [auth])

    const settings = () => {
      return auth?.settings()
    }

    const login = () => {
      netlifyIdentity.open("login");
    };

    const logout = () => {
      netlifyIdentity?.logout()?.then(() => {
        console.log("Logged out")
        setUser(null)
        setIsLoggedIn(false)
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