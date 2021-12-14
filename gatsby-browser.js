require("bootstrap/dist/css/bootstrap.min.css")
require("bootstrap/dist/js/bootstrap.min.js")
require("@popperjs/core/dist/umd/popper.min.js")
const netlifyIdentity = require("netlify-identity-widget");
const GoTrue = require("gotrue-js").default;
const React = require("react")
const { NetlifyAuthProvider } = require('./src/contexts/netlifyAuth')

export const onInitialClientRender = () => {
    netlifyIdentity.init()
};



export const wrapRootElement = ({ element }) => {
    const auth = new GoTrue()

    netlifyIdentity.on("login", user => {
        authContext.user = user;
        authContext.isLoggedIn = true;
    });

    netlifyIdentity.on("logout", () => {
        authContext.user = null;
        authContext.isLoggedIn = false;
    });

    const authContext = {
        isLoggedIn: false,
        user: null,
        login: () => {
            netlifyIdentity.open("login");
        },
        logout: () => {
            netlifyIdentity.logout();
        },
        signup: () => {
            netlifyIdentity.open("signup");
        },
        updateUserData: async (data) => {
            const res = await auth.currentUser().update(data)
            if (res) {
                return await res.getUserData()
            }
            return null
        },
        requestPasswordReset: async email => {
            return await auth.requestPasswordRecovery(email)
        },
        settings: async () => {
            return await auth.settings()
        },
    };
    
    return (
    <NetlifyAuthProvider value={authContext}>
        {element}
    </NetlifyAuthProvider>
)}

