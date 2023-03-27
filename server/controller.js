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

app.listen(port, () => console.log(`Server listening on port ${5500}`));


