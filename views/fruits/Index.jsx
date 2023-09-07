const React = require("react");

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      <div>
        <h1>Fruits Index Page</h1>
        {/* CREATE A NEW FRUIT */}
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
        <ul>
          {fruits.map((fruit, i) => {
            return (
              <li key={i}>
                The <a href={`/fruits/${i}`}>{fruit.name}</a> is {fruit.color}{" "}
                {fruit.readyToEat
                  ? `and she's ready to eat.`
                  : `and she ain't ready to eat`}
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
module.exports = Index;

/* 
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
