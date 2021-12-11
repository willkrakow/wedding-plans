require("bootstrap/dist/css/bootstrap.min.css")
require("bootstrap/dist/js/bootstrap.min.js")
require("@popperjs/core/dist/umd/popper.min.js")
const netlifyIdentity = require("netlify-identity-widget");
const GoTrue = require("gotrue-js").default;
const React = require("react")

export const NetlifyIdentityContext = React.createContext()


export const onInitialClientRender = () => {
    new GoTrue()
    netlifyIdentity.init();
    netlifyIdentity.on("init", user => {
        console.log("init", user);
    });

    netlifyIdentity.on("login", user => {
        console.log(netlifyIdentity.currentUser());
    });

    netlifyIdentity.on("logout", () => {
        window.location.reload();
    });
};



export const wrapRootElement = ({ element }) => {
    return (
    <NetlifyIdentityContext.Provider value={() => new GoTrue}>
        {element}
    </NetlifyIdentityContext.Provider>
)}

