// This is a class component
// We haven't used these yet
const React = require("react");

class Show extends React.Component {
  render() {
    const fruit = this.props.fruit;

    return (
      <div>
        <h1> Show Page </h1>
        The {fruit.name} is {fruit.color}, and{" "}
        {fruit.readyToEat
          ? "it's ready to eat!"
          : "it ain't ready to eat...No touch!"}
        {/* ACCESS IMAGES THROUGH PROPS */}
        <img src={fruit.img} alt="" />
      </div>
    );
  }
}

module.exports = Show;
