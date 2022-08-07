const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const users = require('./routes/users')
const login = require('./routes/login')
const flights = require("./routes/flightRoute")


app.use(express.json());

app.use("/api/flight", flights);
app.use("/api/users", users)
app.use("/api/login", login)

const port = process.env.port || 3000
app.listen(port, () => console.log(`listening on port ${port}`))

