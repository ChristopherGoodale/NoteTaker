const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Helper function to read the database file
function readDB() {
    const data = fs.readFileSync(path.join(__dirname, "../db/noteDB.json"), "utf8");
    return JSON.parse(data);
}

// Helper function to write to the database file
function writeDB(data) {
    fs.writeFileSync(path.join(__dirname, "../db/noteDB.json"), JSON.stringify(data));
}

// Route to retrieve all notes
router.get("/", (req, res) => {
    const data = readDB();
    res.json(data);
});

// Route to add a new note
router.post("/", (req, res) => {
    const data = readDB();
    const newNote = req.body;
    newNote.id = Date.now().toString();
    data.push(newNote);
    writeDB(data);
    res.json(newNote);
});


// Route to update a note
router.put("/:id", (req, res) => {
    const data = readDB();
    const noteId = req.params.id;
    const noteIndex = data.findIndex((note) => note.id === noteId);
    if (noteIndex >= 0) {
        data[noteIndex] = { ...data[noteIndex], ...req.body };
        writeDB(data);
        res.json(data[noteIndex]);
    } else {
        res.status(404).send("Note not found");
    }
});

// Route to delete a note
router.delete("/:id", (req, res) => {
    const data = readDB();
    const noteId = req.params.id;
    const noteIndex = data.findIndex((note) => note.id === noteId);
    if (noteIndex >= 0) {
        data.splice(noteIndex, 1);
        writeDB(data);
        res.sendStatus(204);
    } else {
        res.status(404).send("Note not found");
    }
});

// Route to save a note
router.post("/save-note", (req, res) => {
    const noteData = req.body;
    const data = readDB();
    const noteIndex = data.findIndex((note) => note.id === noteData.id);
    if (noteIndex >= 0) {
        // Update existing note
        data[noteIndex] = { ...data[noteIndex], ...noteData };
        writeDB(data);
        res.json(data[noteIndex]);
    } else {
        // Add new note
        const newNote = { ...noteData, id: Date.now().toString() };
        data.push(newNote);
        writeDB(data);
        res.json(newNote);
    }
});

module.exports = router;
