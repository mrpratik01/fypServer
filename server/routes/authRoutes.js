const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')



router.post('/signup', async(req, res) => {

  try {
    const results = await db.query(
      "INSERT INTO accounts ( user_id,username, password, email) values ( $1, $2, $3, $4) returning *",
      [req.body.user_id, req.body.username, req.body.password, req.body.email]
    );
    console.log(results);

    const token = jwt.sign({user_id:user._id},jwtKey)
    res.send({token})


    

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

