

const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')



router.post("/create-vehicle", async (req, res) => {

    console.log(req.body);
  
    try {
      const results = await db.query(
        "INSERT INTO vehicle ( vehicleName, brands, price, stock ) values ( $1, $2, $3, $4) returning *",
        [req.body.vehicleName, req.body.brands, req.body.price, req.body.stock]
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



router.get("/Vehicles", async (req, res) => {

    console.log(req.body);
  
    try {
      const results = await db.query(
        "SELECT vehicle_id, vehicleName, brands, price, stock FROM vehicle"
      );
      console.log(results);
  
      res.status(201).json({
        status: "success",
        result: results.rows
      });
    } catch (err) {
      console.log(err);
    }
  });


  module.exports = router