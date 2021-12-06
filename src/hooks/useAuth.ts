import React from 'react'
import netlifyIdentity, { User } from 'netlify-identity-widget'


export default function useAuth() {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
      netlifyIdentity.on("login", (user) => {
        setUser(user);
      });

      netlifyIdentity.on("logout", () => {
        setUser(null);
      });

      setUser(netlifyIdentity.currentUser());

      return () => {
        netlifyIdentity.off("login");
        netlifyIdentity.off("logout");
      };
    }, []);

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
    }
}