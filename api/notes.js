const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./db/noteDB.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading note data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

router.post('/', (req, res) => {
    const newNote = req.body;
    fs.readFile('./db/noteDB.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading note data');
        } else {
            const notes = JSON.parse(data);
            newNote.id = notes.length + 1; // Assign a new ID to the note
            notes.push(newNote);
            fs.writeFile('./db/noteDB.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error writing note data');
                } else {
                    res.json(newNote);
                }
            });
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('./db/noteDB.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading note data');
        } else {
            const notes = JSON.parse(data);
            const updatedNotes = notes.filter(note => note.id !== id);
            fs.writeFile('./db/noteDB.json', JSON.stringify(updatedNotes), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error writing note data');
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

module.exports = router;
