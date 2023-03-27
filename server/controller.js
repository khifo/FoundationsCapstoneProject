const express = require("express");
const cors = require("cors");
const Registration = require('./models/Registration');

const app = express();
app.use(cors());

app.use(express.json());

Registration.sync(); // create the table if it doesn't exist

app.post('/registrations', async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json(registration);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create registration' });
  }
});

app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.findAll();
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch registrations' });
  }
});

app.get('/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (registration) {
      res.json(registration);
    } else {
      res.status(404).json({ error: 'Registration not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch registration' });
  }
});

app.put('/registrations/:id', async (req, res) => {
  try {
    const [numUpdated, updatedRegistrations] = await Registration.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (numUpdated) {
      res.json(updatedRegistrations[0]);
    } else {
      res.status(404).json({ error: 'Registration not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update registration' });
  }
});

app.delete('/registrations/:id', async (req, res) => {
  try {
    const numDeleted = await Registration.destroy({ where: { id: req.params.id } });
    if (numDeleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Registration not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete registration' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));


