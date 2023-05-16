const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')


router.get("/orderSummary/:id", async (req, res) => {

  
    try {
      const results = await db.query(
        `select packagedescription, pickup_address, dropoff_address, amount from packages where user_id = ${req.params.id}`
      );
      console.log(results.rows[0]);
      res.status(201).json({
        status: "success",
        result: results.rows
       
      });
    } catch (err) {
      console.log(err);
    }
    
  });



module.exports = router