const React = require("react");
// Don't follow slides. Our directory structure is different
const DefaultLayout = require("../layout/Default.jsx");

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      // Title Passed as props
      <DefaultLayout title={"Fruits Home"}>
        {/* <h1>Fruits Index Page</h1> // REMOVED WHEN REACT LAYOUT ADDED */}
        {/* CREATE A NEW FRUIT */}
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
        <ul>
          {fruits.map((fruit, i) => {
            return (
              <li key={i}>
                {/* Index now needs to grab i from Mongo (_id) */}
                The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is{" "}
                {fruit.color}{" "}
                {fruit.readyToEat
                  ? `and she's ready to eat.`
                  : `and she ain't ready to eat yet. Go on!`}
                <br />
                {/* EDIT */}
                {/* We're using the DB _id because we def want to manipulate there */}
                {/* Add the route to your server */}
                {/* I made this a button */}
                {/* CODE-ALONG OG: <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a> */}
                <form action={`/fruits/${fruit._id}/edit`}>
                  <input type="submit" value="Edit" />
                </form>
                {/* <br /> */}
                {/* DELETE FORM BUTTON, CREATE DELETE ROUTE IN SERVER.JS */}
                {/* USE methodOverride, see NOTES */}
                <form
                  action={`/fruits/${fruit._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="submit" value="Delete" />
                </form>
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}
module.exports = Index;

/* 
DELETE ACTION USING methodOverride
<form
  action={`/fruits/${fruit._id}?_method=DELETE`}
  method="POST"
>

<ul>
{fruits.map((fruit, i) => {
    return (
        <li>
            // NEED A SPACE IN JSX
            The{' '}
            // CAN USE RELATIVE PATH. ENGINE WILL FILL IN THE BASE URL
            <a href={`/fruits/${i}`}>
                {fruit.name}
            </a>{' '}
            is {fruit.color} <br></br>
            {fruit.readyToEat
                ? `It is ready to eat`
                : `It is not ready to eat`}
            <br />
        </li>
    );
})}
*/
