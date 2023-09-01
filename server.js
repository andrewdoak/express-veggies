// Load express
const express = require('express');

// Create our express app
const app = express();

// Define server port
const PORT = process.env.PORT || 3000;  

// 'Import' fruits
const fruits = require ("./models/fruits")

// Different from slides
// Didn't have to invoke yesterday because we created the function.
// Here it's a built-in method
const jsxViewEngine = require('jsx-view-engine');
// VIEWS ENGINE DEFAULT SETTING: LOOKS FOR JSX
app.set('view engine', 'jsx');
// Invoke App Engine
app.engine('jsx', jsxViewEngine());


// 1. FRUITS (index) route
  app.get('/fruits', (req, res) => {
    // res.send(fruits);
    // Change to use the view engine
    res.render('Index', { fruits }); // shorthand JSX sets key and value to var name
    // })
});

// 2. SHOW route (no data persits here)
app.get('/fruits/:id', (req, res) => {
    // SSR version of passing props.
    // This is passing props. Add props in 'Show.jsx'
    res.render('Show', {
        fruit: fruits[req.params.id]
    })
});

// 3. NEXT route (STOPPED 8/31 3:15P)
app.get('/fruits/:id', (req, res) => {
    // 
    res.send(fruits[req.params.id]);
});


// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(PORT, function () {
  console.log(`Server listening on port: ${PORT}`);
});

/* 
SLIDES URL:
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-12/day-1/slides/

CODE ALONG (DAY 1)
https://pscohorts.slack.com/archives/C056A692JAX/p1693511684080759

CODE ALONG (DAY 2)
https://pscohorts.slack.com/archives/C056A692JAX/p1693579804180239



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
/photos/	        GET	            index	    Displaying a list of all photos
/photos/new	        GET	            new	        Display HTML form for creating a new photo
/photos/:id	        DELETE	        destroy	    Delete a specific photo
/photos/:id	        PATCH/PUT	    update	    Update a specific photo
/photos	            POST	        create	    Create a new photo
/photos/:id/edit	GET	            edit	    Return an HTML form for editing a photo
/photos/:id	        GET	            show	    Display a specific photo
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