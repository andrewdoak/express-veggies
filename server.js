// Load express
const express = require('express');

// Create our express app
const app = express();

// Define server port
const PORT = process.env.PORT || 3000;  

// Import fruits
const fruits = require ("./models/fruits")


// 1. FRUITS (index) route
  app.get('/fruits', (req, res) => {
    res.send(fruits);
});

// 2. SHOW route (no data persits here)
app.get('/fruits/:id', (req, res) => {
    // Reach into the array and get an index
    res.send(fruits[req.params.id]);
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

CODE ALONG:
The reason we're doing this practice is for MVC
Model View Controller.
The point of that: Compartmentalized code.
Now we have data, listening, and routes

MODELS (COOK): DATA (JS VARIABLES) > WILL BE DB (MONGO)
VIEWS (CUSTOMER): HOW THE DATA IS DISPLAYED (REACT)
CONTROLLER (WAITER): GLUE THAT CONNECTS MODELS WITH LOGIC  (RES.SEND ETC CALLBACKS)

NOTES/CODE COMMENTS
====================
ORDER OF ROUTES: SUPER IMPORTANT
YOUR APP WILL BREAK AND YOU WON'T KNOW WY IF YOU DON'T FOLLOW
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