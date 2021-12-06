require("bootstrap/dist/css/bootstrap.min.css")
require("bootstrap/dist/js/bootstrap.min.js")
require("@popperjs/core/dist/umd/popper.min.js")
const netlifyIdentity = require("netlify-identity-widget");

export const onInitialClientRender = () => {
    console.log("onInitialClientRender");
    netlifyIdentity.init();
};

netlifyIdentity.on("init", user => {
    console.log("init", user);
});

netlifyIdentity.on("login", user => {
    console.log(netlifyIdentity.currentUser());
});

netlifyIdentity.on("logout", () => {
});

