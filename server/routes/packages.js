

const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')





router.get("/packages", async (req, res) => {
  try { 
    const results = await db.query("select * from packages");
    console.log(results);
    res.status(200).json({
      status: "success",
      result: results.rows
      
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/accounts", async (req, res) => {
  try { 
    const results = await db.query("select id, username, email, phoneNumber from accounts");
    console.log(results);
    res.status(201).json({
      status: "success",
      result: results.rows
     
    });
  } catch (err) {
    console.log(err);
  }
});

//get a package
router.get("/packages/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query(
      `select * from packages where user_id = ${req.params.id}`
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




router.post("/inserting-package-details", async (req, res) => {



  const totalAMT = (req.body.totalKM * req.body.weight)


  // const totalAMT1 = (totalKM,weight) => {

  //   const myFinalValue = (totalKM / weight) * 100;
  //   return myFinalValue;

  // }


 
  try {
    const results = await db.query(
      "INSERT INTO packages ( packageDescription, pickup_address, dropoff_address, package_category, weight, user_id, amount, totalkm) values ( $1, $2, $3, $4, $5, 44, $6) returning *",
      [req.body.packageDescription, req.body.pickup_address, req.body.dropoff_address, req.body.package_category, req.body.weight, totalAMT]
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






router.post("/create-packages", async (req, res) => {

  const totalAMT = (req.body.kilometer * req.body.weight)
  console.log(totalAMT)

  try {
    const results = await db.query(
      "INSERT INTO packages ( packageDescription, pickup_address, dropoff_address, package_category, weight, user_id, amount, totalkm) values ( $1, $2, $3, $4, $5, $6, $7, $8) returning *",
      [req.body.packageDescription, req.body.pickup_address, req.body.dropoff_address, req.body.package_category, req.body.weight, req.body.user_id, totalAMT, req.body.kilometer]
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

router.put("/packages/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  try {
    const results = await db.query(
      "UPDATE packages SET pickup_address = $1, dropoff_address = $2, where package_Id = $4 returning *",
      [req.body.pickup_Address, req.body.dropoff_address, req.body.user_id]
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

router.delete("/packages/:id", async (req, res) => {
    console.log(req.params.id);

    try{

        const results = await db.query("DELETE FROM packages where package_Id = $1", [req.params.id])
        res.status(204).json({
            status: "success",
          });


    }catch (err){
        console.log(err);

    }

});


module.exports = router