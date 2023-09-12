// LAYOUT COMPONENT
const React = require("react");

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          {/* IMPORTS CSS from /public */}
          <link rel="stylesheet" href="/css/app.css" />
          <title>{this.props.title}</title>
        </head>
        <body>
          <h1>{this.props.title}</h1>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;

/* 
BASE layout with header, body w/H1, body children.
*/
