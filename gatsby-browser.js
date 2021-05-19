require("bootstrap/dist/css/bootstrap.min.css")
require("bootstrap/dist/js/bootstrap.min.js")
require("@popperjs/core/dist/umd/popper.min.js")

const React = require('react')
const Layout = require('./src/components/layout').default


exports.wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>
}