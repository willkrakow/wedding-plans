require("bootstrap/dist/css/bootstrap.min.css")
require("bootstrap/dist/js/bootstrap.min.js")
require("@popperjs/core/dist/umd/popper.min.js")
const ReactNetlify = require("react-netlify-identity")
const netlifyIdentity = require("netlify-identity-widget");
const React = require("react")

const { IdentityContextProvider } = ReactNetlify

export const onInitialClientRender = () => {
    netlifyIdentity.init();
    netlifyIdentity.on("init", user => {
        console.log("init", user);
    });

    netlifyIdentity.on("login", user => {
        console.log(netlifyIdentity.currentUser());
        window.location.reload();
    });

    netlifyIdentity.on("logout", () => {
    });
};

