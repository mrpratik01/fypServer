

const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')


app.get("/api/v1/packages", async (req, res) => {
  try {
    const results = await db.query("select * from packages");
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        packages: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//get a package
app.get("/api/v1/packages/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query(
      `select * from packages where user_id = ${req.params.id}`
    );
    console.log(results.rows[0]);
  } catch (err) {
    console.log(err);
  }
  res.status(201).json({
    status: "success",
    data: {
      packages: "cotton",
    },
  });
});

//create a packages

app.post("/api/v1/packages", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO packages ( packagesDescription, pickup_Address, dropoff_address, package_Category, weight) values ( $1, $2, $3, $4, $5) returning *",
      [req.body.packageDescription, req.body.pickup_Address, req.body.dropoff_address, req.body.package_Category, req.body.weight]
    );
    console.log(results);

    res.status(201).json({
      status: "success",
      data: {
        packages: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE accounts SET username = 'hash', password = "hashh", email = "emaill", where user_id = 5;

//update packages

app.put("/api/v1/packages/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  try {
    const results = await db.query(
      "UPDATE accounts SET username = $1, password = $2, email = $3 where user_id = $4 returning *",
      [req.body.username, req.body.password, req.body.email, req.body.user_id]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        packages: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete packages

app.delete("/api/v1/packages/:id", async (req, res) => {
    console.log(req.params.id);

    try{

        const results = await db.query("DELETE FROM accounts where user_id = $1", [req.params.id])
        res.status(204).json({
            status: "success",
          });


    }catch (err){
        console.log(err);

    }

});