// This is a class component
// We haven't used these yet
const React = require("react");

class Show extends React.Component {
  render() {
    // TODO: destructure (replace "fruit")
    // const {name, color, readyToEat, img }
    const fruit = this.props.fruit;

    return (
      <div>
        {/* MY ADD */}
        <nav>
          <a href="/fruits">Fruits Home</a>
        </nav>
        <h1> Show Page </h1>
        The {fruit.name} is {fruit.color}, and{" "}
        {fruit.readyToEat
          ? "she's ready to eat!"
          : "she ain't ready to eat yet...Go on!"}
        {/* ACCESS IMAGES THROUGH PROPS */}
        <br />
        <img src={fruit.img} alt="" />
      </div>
    );
  }
}

module.exports = Show;
