

const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')


router.post("/payment", async (req, res) => {
    console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO payment ( payment_status, payment_type, payment_amt) values ( $1, $2, $3 ) returning *",
      [req.body.payment_status, req.body.payment_type, req.body.payment_amt]
    );
    console.log(results);

    res.status(201).json({
      status: "success",
      data: {
        payment: results.rows[0],
      }, 
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router