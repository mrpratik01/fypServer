const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')



router.post("/wallet", async (req, res) => {

    console.log(req.body);

    try {
      const results = await db.query(
        "INSERT INTO wallet ( wallet_amt) values ( $1) returning *",
        [req.body.wallet_amt]
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


})
module.exports = router;