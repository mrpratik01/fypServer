const express = require("express");
const bodyParser = require('body-parser')
const db = require("../server/db/index");
const morgan = require("morgan");
const { password } = require("pg/lib/defaults");
const app = express();

const authRoutes = require('./routes/authRoutes')
const packages = require('./routes/packages')

app.use(bodyParser.json())
app.use(authRoutes)


app.use(express.json());

//get all packages\\

// app.use('/api', authRoutes)

app.use ('/api', packages)


const port = 3001;

app.listen(port, () => {
  console.log(`port is listening on port ${port} `);
});
