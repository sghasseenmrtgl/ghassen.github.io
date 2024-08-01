const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-comment', (req, res) => {
    const comment = req.body.comment;
    console.log('Comment received:', comment);

    // Ajouter le commentaire au fichier comments.txt
    fs.appendFile('comments.txt', comment + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Error writing to file');
            return;
        }
        res.send('Comment received and stored');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/comments', (req, res) => {
    fs.readFile('comments.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});
