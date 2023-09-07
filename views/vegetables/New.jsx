const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <h1>Add Vegetables</h1>
        {/* NOTE: action will be the route, method will be the HTTP verb */}
        <form action="/vegetables" method="POST">
          Name: <input type="text" name="name" />
          <br />
          Color: <input type="text" name="color" />
          <br />
          <br />
          Veg pun here! <input type="text" name="pun" />
          <br />
          Paste an image URL: <input type="text" name="img" />
          <br />
          Is it Ready To Eat? <input type="checkbox" name="readyToEat" />
          <br />
          <input type="submit" name="" value="Add a Vegetable" />
        </form>
        {/* HOME "Button" */}
        <nav>
          <a href="/vegetables">Vegetables Home</a>
        </nav>
      </div>
    );
  }
}

module.exports = New;

/*  
HOW does the server know which thing was submitted. 
The form actually predates axios, fetch, etc. The form makes the request.

<form action="/vegetables" method="POST">
We DO need to specify where the request goes (otherwise, the page will just refresh)
Also, needs to be a POST request. Default GET will go to Index.

It's specific to the values we set up in the form itself.
Key/Value pairs are what the form submits ('name' attribute) Note 'readyToEat'.
*/
