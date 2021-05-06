//dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
//creating server using express()
const app = express();
const PORT = process.env.PORT ||1000 ;
//builtin middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//built in middleware for parsing application/json
app.use(express.json());

//built in middleware to serve static file in express.js
app.use(express.static("public"));

//importing routes.js file 
app.get("/", function (req ,res) {
   res.sendFile(path.join(__dirname, 'public/index.html'));
});  
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html')); 
});
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, '/db/db.json'));  
});

app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(response);
        const noteRequest = req.body;
        const newNoteId = notes.length + 1;
        const newNote = {
            id: newNoteId,
            title: noteRequest.title,
            text: noteRequest.text,
        };
        notes.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
        });
    });
});

// //delete Data 
// app.delete('/api/notes/:id', (request, response) => {

//     const selectedNoteID = request.params.id;
//     console.log(`Delete item with id: ${selectedNoteID}`);

//     // //remove item from notes array
//     notes = notes.filter(note => note.id != selectedNoteID);

//     response.end();
// });

//start server to listen 
app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}.`);
});