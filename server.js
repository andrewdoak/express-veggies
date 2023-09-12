// ENV package
require("dotenv").config();
// Load express
const express = require("express");

// Create our express app
const app = express();

// Define server port
const PORT = process.env.PORT || 3000;

// 'Import' fruit
const Fruit = require("./models/fruit");
// check that this is working
// console.dir(Fruit);

// Import mongoose (will do this w/every app)
const mongoose = require("mongoose");

// TO ALLOW DELETE WITH FORM ELEMENTS (NON-DEFAULT BEHAVIOR)
// ORDER MATTERS WHEN THERE IS A DEPENDENCY
const methodOverride = require("method-override");

// DB Connection (from DAY 3 Slides)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Got error. Josh said delete this line
  // useCreateIndex: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// MAKE SURE dotenv is working
// console.log(process.env.ENVVAR);

// Different from slides
// Didn't have to invoke yesterday because we created the function.
// Here it's a built-in method
const jsxViewEngine = require("jsx-view-engine");
const vegetables = require("./models/vegetable");
// VIEWS ENGINE DEFAULT SETTING: LOOKS FOR JSX
app.set("view engine", "jsx");
// Invoke App Engine
app.engine("jsx", jsxViewEngine());

// CSS IMPORT
// Serves static files (CSS) from the /public directory
// Needs to go before any routes
// Grouped with app.use stuff
app.use(express.static("public"));

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

// DELETE MIDDLEWARE
// After app has been defined
// Use methodOverride.
// Will add a query param to our delete form named _method
app.use(methodOverride("_method"));

// 0a. SEED route (for testing)
// Populates your DB
// Would probably use a seed script IRL
// Comment out after working
/* 
app.get('/fruits/seed', async (req, res) => {
  try {
    await Fruit.create([
      {
        name: 'grapefruit',
        color: 'pink',
        readyToEat: true
      },
      {
        name: 'grape',
        color: 'purple',
        readyToEat: false
      },
      {
        name: 'avocado',
        color: 'green',
        readyToEat: true
      }
    ]);
    res.redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
})
*/

// 1a. "I" FRUITS (index) route
// DELETED A BUNCH 9/7
// Added async/await & try/catch
app.get("/fruits", async (req, res) => {
  try {
    // Finds all fruit documents
    const foundFruits = await Fruit.find({});
    console.log(foundFruits);
    res.status(200).render("fruits/Index", {
      fruits: foundFruits,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 1b. "I" VEGGIES (index) route
// LAB WORK, TO MIRROR 1A
app.get("/vegetables", async (req, res) => {
  try {
    // Finds all fruit documents
    const foundVegetables = await Vegetable.find({});
    console.log(foundVegetables);
    res.status(200).render("vegetables/Index", {
      fruits: foundVegetables,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 2a. "N" NEW FRUIT route (has to be before show, INDUCES)
app.get("/fruits/new", (req, res) => {
  console.log("New controller");
  res.render("fruits/New");
});

// 2b. "N" NEW VEG route (has to be before show, INDUCES)
app.get("/vegetables/new", (req, res) => {
  console.log("New controller");
  res.render("vegetables/New");
});

// 3a. "D" DELETE FRUIT route
// Need an async/await (not the callback in the slides)
app.delete("/fruits/:id", async (req, res) => {
  try {
    // DB Delete (not the DB _id)
    await Fruit.findByIdAndDelete(req.params.id);
    // Redirect refreshes page
    // Remember this is a route not a path (initially it went to fruits/fruits)
    res.status(200).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

// 3a. "D" DELETE VEG route
// app.delete("/vegetables/:id", (req, res) => {
//   res.send("Deleting...");
// });

// 4a. "U' UPDATE FRUIT route
app.put("/fruits/:id", async (req, res) => {
  // IF UPDATES THE CHECKED PROPERTY / ELSE UPDATES THE REST
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    // ID is from the URL clicked on the edit page, (FORM BODY), also links to DB
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});
// 4b. "U' UPDATE VEG route

// 5a. "C" CREATE FRUIT route (can use the same route because different method)
// AFTER ADDING MONGOOSE, WE HAVE TO GO OFF SLIDES (v7 dropped callbacks)
// HAVE TO USE .then or async/await (DELETED A BUNCH OF CODE & NOTES)
app.post("/fruits", async (req, res) => {
  // Logs the post object (thru middleware) in the terminal
  console.log(req.body);
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    // https://mongoosejs.com/docs/models.html#constructing-documents
    // https://www.geeksforgeeks.org/mongoose-schematype-options/#
    // Takes an object that follows your schema
    const createdFruit = await Fruit.create(req.body);
    res.status(201).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
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
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    // Find DOC in DB & UPDATE
    const foundFruit = await Fruit.findById(req.params.id);
    // Render EDIT page (we need to make this first)
    res.render("fruits/Edit", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 8a. "E" EDIT VEG route

// 7a. "S" SHOW route (no data persists here)
app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// 7b. "S" SHOW route (no data persists here)
// Dels
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

3. MongoDB Slides
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-12/day-3/slides/

4. React Layouts
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-13/day-1/slides/

CODE ALONG (DAY 1)
https://pscohorts.slack.com/archives/C056A692JAX/p1693511684080759

CODE ALONG (DAY 2)
https://pscohorts.slack.com/archives/C056A692JAX/p1693579804180239

CODE ALONG (DAY 3)
https://pscohorts.slack.com/archives/C056A692JAX/p1693924679459259?thread_ts=1693924655.297689&cid=C056A692JAX

CODE ALONG (DAY 4)
https://pscohorts.slack.com/archives/C056A692JAX/p1694105916642769

CODE ALONG (DAY 5 - LAYOUTS)



WEEK 12 DAY 1 COMMENTS
=======================
LAYOUT, DELETE, EDITING (MAYBE DEPLOY)
TODAY, WE'LL MAKE A HIGHER ORDER COMPONENT THAT ACCEPTS CHILDREN (PROPS)

1. Make a LAYOUT directory and a Default.jsx for the layout.

To be able to delete and work around button not being able to delete, need to POST/GET
Method override npm package can get around it.
npm i method-override

2. Final thing after adding CSS and adding lines to package.json

Package.json

Add a new object at the end:
"engines": {
    "node": "20.5.1"
  }
  
Under "scripts"
Last line (add comma)
"build": "npm i"

RENDER ACCOUNT (CREATE ONE USE GITHUB)
https://dashboard.render.com/
Create a new Web Service
Paste your GitHub URL (after you push CRUD code, I haven't yet)

Name: no spaces
Runtime: node
Build: npm run build
Start: node server.js
(nodemon is dev, this is production)

Advanced button:
Add .env variable
Put the key and value from your .env file
Key is MONGO_URI, Value is the rest


WEEK 11 DAY 2 COMMENTS
=======================
Mongoose is the JS Library we use to interact with / communicate with MongoDB.
Can also use Atlas & the command line.
Mongoose works by defining schemas that get compiled into models.
They perform CRUD operations.

GET DOTENV PACKAGE (NPM)
npm i dotenv
Check in package.json for it
Make a new line in .gitignore to ignore .env
Touch .env
Put placeholder in .env file ("ENVVAR=thisisavariablefrommy.envfile") and save

Top of server.js (to read .env files in your server)
// ENV package
require("dotenv").config();

// MAKE SURE dotenv is working
console.log(process.env.ENVVAR);

Go to your MongoDB Cluster
Connect using "Driver"
Copy the connection string
In .env, add a line
MONGO_URI=mongodb+srv://andrewdoak:<password>@clusterone.z741vjw.mongodb.net/fruitsPortal?retryWrites=true&w=majority
"fruitsPortal" goes in between /? in the URI
Put your db password between the carets <> (no more carets, that is)
Mine is saved UNDER my login in 1P

CONNECT TO MONGOOSE
npm i mongoose

MODELS FOLDER
Deleting everything in fruits.js MODELS.
Changed filename to fruit.js
Make a schema

READ FRUIT
Index route

CHECK NEW DB ENTRY
https://cloud.mongodb.com/v2/5a2ec2eed383ad5c553a873f#/metrics/replicaSet/64f7764af383d97e47751493/explorer/fruitsPortal/fruits/find

WEEK 12 DAY 1 COMMENTS
=======================
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
