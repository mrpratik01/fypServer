const express = require("express");
const router = express.Router();
const db = require("../db/index");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");


router.post("/addNewLocation", async (req, res) => {
    console.log(req.body);

    try {
      const results = await db.query(
        "INSERT INTO addressinfo (name, fulladdress, number) values ( $1, $2, $3) returning *",
        [req.body.name, req.body.fulladdress, req.body.number]
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


  module.exports = router;