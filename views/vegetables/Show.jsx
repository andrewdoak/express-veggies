// This is a class component
// We haven't used these yet
const React = require("react");

class Show extends React.Component {
  render() {
    // TODO: destructure (replace "vegetables")
    // const {name, color, readyToEat, img }
    const vegetables = this.props.vegetables;

    return (
      <div>
        <h1> Show me the Veggies! </h1>
        <h3>{vegetables.name}?</h3>
        <p>{vegetables.color}, of course!</p>

        <h3>How about a {vegetables.name} pun?</h3>
        <p>
          <i>{vegetables.pun}!</i>
        </p>
        {/* TODO: Add readyToEat */}
        <br></br>
        {/* ACCESS IMAGES THROUGH PROPS */}
        <img src={vegetables.img} alt="" />
      </div>
    );
  }
}

module.exports = Show;
