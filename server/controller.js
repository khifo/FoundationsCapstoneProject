const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());


app.get("/teams", (req, res) => {
  const ourteams = ["U10", "U12", "U14"];
  res.json(ourteams);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const user = { name, email, password };
  res.status(201).json(user);
});

let registrations = [];

app.post('/registrations', (req, res) => {
  const registration = req.body;
  registrations.push(registration);
  res.status(201).json(registration);
});

app.get('/registrations', (req, res) => {
  res.json(registrations);
});

app.get('/registrations/:id', (req, res) => {
  const id = req.params.id;
  const registration = registrations.find(registration => registration.id === id);
  if (registration) {
    res.json(registration);
  } else {
    res.status(404).json({ error: 'Registration not found' });
  }
});

app.put('/registrations/:id', (req, res) => {
  const id = req.params.id;
  const newRegistration = req.body;
  const index = registrations.findIndex(registration => registration.id === id);
  if (index !== -1) {
    registrations[index] = newRegistration;
    res.json(newRegistration);
  } else {
    res.status(404).json({ error: 'Registration not found' });
  }
});

app.delete('/registrations/:id', (req, res) => {
  const id = req.params.id;
  const index = registrations.findIndex(registration => registration.id === id);
  if (index !== -1) {
    registrations.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Registration not found' });
  }
});



app.listen(port, () => console.log(`Server listening on port ${5500}`));


