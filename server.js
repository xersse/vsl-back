const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let visitors = [];

// Route pour récupérer les utilisateurs
app.get('/users', (req, res) => {
  res.json(users);
});

// Route pour ajouter un utilisateur
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    users.push({ name, email });
    res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
  } else {
    res.status(400).json({ message: 'Nom et email sont requis' });
  }
});

// Route pour enregistrer un visiteur
app.post('/log-visitor', (req, res) => {
  const { timestamp, userAgent } = req.body;
  visitors.push({ timestamp, userAgent });
  // Optionnel : Écrire les visiteurs dans un fichier pour persistance
  fs.writeFileSync('visitors.json', JSON.stringify(visitors, null, 2));
  res.status(201).json({ message: 'Visiteur enregistré avec succès' });
});

// Route pour récupérer les visiteurs (optionnel)
app.get('/visitors', (req, res) => {
  res.json(visitors);
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
