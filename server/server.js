const express = require("express");
const bodyParser = require('body-parser')
const db = require("../server/db/index");
const morgan = require("morgan");
const { password } = require("pg/lib/defaults");
const app = express();
// const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const packages = require('./routes/packages')
const payment = require('./routes/payment')
const wallet = require('./routes/wallet')
const addressinfo = require('./routes/addressInfo')
const vehicle = require('./routes/vehicle')
const orderSummary = require('./routes/orderSummary')

app.use(bodyParser.json())
app.use(authRoutes)


app.use(express.json());

//get all packages\\

// app.use('/api', authRoutes)

app.use ('/api', authRoutes)
app.use('/api', addressinfo)
app.use('/api', packages)
app.use('/api', vehicle)
app.use('/api', orderSummary)

// app.use(cors());


const port = 3001;

app.listen(port, () => {
  console.log(`port is listening on port ${port} `);
});
