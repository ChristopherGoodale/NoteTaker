const express = require('express');
const path = require('path');
const fs = require('fs');
const notesRouter = require("./routes/app")

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.use('/api/notes', notesRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
