// Load express
const express = require("express");

// Create our express app
const app = express();

// Define server port
const PORT = process.env.PORT || 3000;

// 'Import' fruits
const fruits = require("./models/fruits");

// Different from slides
// Didn't have to invoke yesterday because we created the function.
// Here it's a built-in method
const jsxViewEngine = require("jsx-view-engine");
const vegetables = require("./models/vegetables");
// VIEWS ENGINE DEFAULT SETTING: LOOKS FOR JSX
app.set("view engine", "jsx");
// Invoke App Engine
app.engine("jsx", jsxViewEngine());

// MIDDLEWARE (needs to run first)
//near the top, around other app.use() calls
// parses url encoded bodies and and creates a new body object
app.use((req, res, next) => {
  console.log("Middleware: I run for all routes");
  next();
});

// VIEW BODY OF A POST REQUEST
// Returns a callback (function that parses your data)
// Gives access to req.body
app.use(express.urlencoded({ extended: false }));

// 1a. "I" FRUITS (index) route
app.get("/fruits", (req, res) => {
  //Shows middleware
  console.log("Index controller");
  // res.send(fruits);
  // Change to use the view engine
  res.render("fruits/Index", { fruits }); // shorthand JSX sets key and value to var name
  // })
});

// 1b. "I" VEGGIES (index) route
app.get("/vegetables", (req, res) => {
  // res.send(fruits);
  // Change to use the view engine
  res.render("vegetables/Index", { vegetables }); // shorthand JSX sets key and value to var name
  // })
});

// 2a. "N" NEW FRUIT route (has to be before show, INDUCES)
app.get("/fruits/new", (req, res) => {
  console.log("New controller");
  res.render("fruits/New", { fruits });
});

// 2b. "N" NEW VEG route (has to be before show, INDUCES)
app.get("/vegetables/new", (req, res) => {
  console.log("New controller");
  res.render("vegetables/New", { fruits });
});

// 3a. "D" DELETE FRUIT route
// 3a. "D" DELETE VEG route

// 4a. "U' UPDATE FRUIT route
// 4b. "U' UPDATE VEG route

// 5a. "C" CREATE FRUIT route (can use the same route because different method)
app.post("/fruits", (req, res) => {
  // Logs the post object (thru middleware) in the terminal
  console.log(req.body);
  // WENT OFF SCRIPT, DID A TERNARY
  //   if (req.body.readyToEat === "on") {
  //     //if checked, req.body.readyToEat is set to 'on'
  //     req.body.readyToEat = true; //do some data correction
  //   } else {
  //     //if not checked, req.body.readyToEat is undefined
  //     req.body.readyToEat = false; //do some data correction
  //   }

  // TERNARY OF THE ABOVE CONDITIONAL (CAN EVEN OMIT THE TERNARY, JOSH FANCINESS, DIDN'T UNDERSTAND)
  // THE CONDITION ITSELF RETURNS TRUE OR FALSE, WHICH IS WHY YOU CAN OMIT THE TERNARY
  // REQUEST GOES TO THE POST/CREATE ROUTE (ROUTE IS THE PATH AND THE METHOD TOGETHER)
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  fruits.push(req.body);
  console.log(fruits);
  // This "we got the data" page is not really user-friendly. We want to see the web page
  // res.send("We got the data");

  // Send the user back to /fruits
  res.redirect("/fruits");
});

// 5b. "C" CREATE VEG route (can use the same route because different method)
app.post("/vegetables", (req, res) => {
  console.log(req.body);
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
  vegetables.push(req.body);
  console.log(vegetables);
  res.redirect("/vegetables");
});

// 8a. "E" EDIT FRUIT route
// 8a. "E" EDIT VEG route

// 7a. "S" SHOW route (no data persists here)
app.get("/fruits/:id", (req, res) => {
  // SSR version of passing props.
  // This is passing props. Add props in 'Show.jsx'
  res.render("fruits/Show", {
    fruit: fruits[req.params.id],
  });
});

// 7b. "S" SHOW route (no data persists here)
app.get("/vegetables/:id", (req, res) => {
  // SSR version of passing props.
  // This is passing props. Add props in 'Show.jsx'
  res.render("vegetables/Show", {
    vegetables: vegetables[req.params.id],
  });
});

// // 3. NEXT route (STOPPED 8/31 3:15P)
// app.get("/fruits/:id", (req, res) => {
//   //
//   res.send(fruits[req.params.id]);
// });

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(PORT, function () {
  console.log(`Server listening on port: ${PORT}`);
});

/* 
SLIDES URL:
1.Index and Show Routes
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-12/day-1/slides/

2. New and Create Routes
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-12/day-2/slides/

CODE ALONG (DAY 1)
https://pscohorts.slack.com/archives/C056A692JAX/p1693511684080759

CODE ALONG (DAY 2)
https://pscohorts.slack.com/archives/C056A692JAX/p1693579804180239

CODE ALONG (DAY 3)
https://pscohorts.slack.com/archives/C056A692JAX/p1693924679459259?thread_ts=1693924655.297689&cid=C056A692JAX

WEEK 12 DAY 1 COMMENTS
===============
ADDED TO PACKAGE.JSON (WATCHES FOR CHANGES IN THE BELOW, NO SERVER RESTART NEEDED)
"dev": "nodemon --ext js, jsx, json"

Middleware: (Use route) 
Function, runs in the middle of request, response cycle.
Runs before the "Create" route.
Like checking for user auth.
Should be towards the top.

DAY 2 COMMENTS
===============
The reason we're doing this practice is for MVC
Model View Controller.
The point of that: Compartmentalized code.
Now we have data, listening, and routes

MODELS (COOK): DATA (JS VARIABLES) > WILL BE DB (MONGO)
VIEWS (CUSTOMER): HOW THE DATA IS DISPLAYED (REACT)
CONTROLLER (WAITER): GLUE THAT CONNECTS MODELS WITH LOGIC  (RES.SEND ETC CALLBACKS)

MODELS
WE CREATED A FOLDER MODELS AND A FILE VIEWS.
PUT THE FRUITS ARRAY IN IT AND DID A MODULE EXPORT/IMPORT 
SERVICE FILE-SIMILAR

VIEWS
WE'RE GONNA USE JSX.
NOT FULL REACT, THOUGH. JSX VIEW ENGINE.
DOESN'T HAVE THE VIRTUAL DOM. NO HOOKS EITHER.
MADE A VIEWS FOLDER, TOO.

INSTALL DEPENDENCIES
npm i jsx-view-engine react react-dom

CONTROLLER



NOTES/CODE COMMENTS
====================
ORDER OF ROUTES: SUPER IMPORTANT (7 RESTFUL ROUTES)
    REST (REPRESENTATIONAL STATE TRANSFER)
    ALLOW CRUD FUNCTIONALITY TO HAPPEN SERVER SIDE

YOUR APP WILL BREAK AND YOU WON'T KNOW WHY IF YOU DON'T FOLLOW
INDUCES for the order in your app
URL	                HTTP VERB	    ACTION	    USED FOR
/photos/	          GET	            index	      Displaying a list of all photos
/photos/new	        GET	            new	        Display HTML form for creating a new photo
/photos/:id	        DELETE	        destroy	    Delete a specific photo
/photos/:id	        PATCH/PUT	      update	    Update a specific photo
/photos	            POST	          create	    Create a new photo
/photos/:id/edit	  GET	            edit	      Return an HTML form for editing a photo
/photos/:id	        GET	            show	      Display a specific photo
*/

/* 
// BASE ROUTE BOILERPLATE
app.get('/', function(req, res) {
    res
    .send(`
        <h1 
            style="
            color: #0f261f; 
            font-family: Avenir;
        ">
        Fruits App
        </h1>
        
        <a href="https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-12/day-1/slides/" 
            target=”_blank” 
            rel=“noopener noreferrer”
            style=
            "color: #ff616b; 
            font-family: Monospace;
        ">
            Link to Slides >
        </a>
    `);
  });
*/
