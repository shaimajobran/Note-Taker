//creating server using express()
const express = require('express'),
      app = express();
      PORT = process.env.PORT || 1000;
      apiRoute = require("./routes/route-API");
      htmlRoute = require("./routes/route-HTML");

//builtin middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//built in middleware for parsing application/json
app.use(express.json());

//built in middleware to serve static file in express.js
app.use(express.static("public"));

//importing routes.js file 
apiRoute(app);
htmlRoute(app);


//start server to listen 
app.listen(PORT, () => {
    console.log('app is running at http://localhost:' + PORT);
});