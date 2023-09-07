// FRUITS (ARRAY OF OBJECTS)
const fruits = [
  {
    name: "apple",
    color: "red",
    readyToEat: true,
    img: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "pear",
    color: "green",
    readyToEat: false,
    img: "https://unsplash.com/photos/RUiYB0Wjx9k", // copy image url from image & update all the below
  },
  {
    name: "banana",
    color: "yellow",
    readyToEat: true,
    img: "https://unsplash.com/photos/s1a6NqANIYc",
  },
  // {
  //     name:'lychee',
  //     color: 'magenta',
  //     readyToEat: true,
  //     img: "https://unsplash.com/photos/YU6MwXyHMI4"
  // }
];

// How to export in common JS
// HAS to be plural (!!)
module.exports = fruits;
