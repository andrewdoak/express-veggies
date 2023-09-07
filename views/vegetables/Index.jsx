const React = require("react");

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;
    return (
      <div>
        <h1>Vegetables Index Page</h1>
        {/* CREATE A NEW VEGETABLE */}
        <nav>
          <a href="/vegetables/new">Add a Vegetable</a>
        </nav>
        <ul>
          {vegetables.map((vegetables, i) => {
            return (
              <li key={i}>
                <a href={`/vegetables/${i}`}>{vegetables.name}</a>
                {"?"}
                <br></br>
                {vegetables.color} <br></br>
                Pun: {vegetables.pun}
                <br />
                <img src={vegetables.image} />
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
