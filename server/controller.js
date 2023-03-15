require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {5500} = process.env

app.use(express.json())
app.use(cors())

app.listen(5500, () => console.log(`up on ${5500}`))


