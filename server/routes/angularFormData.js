const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')


router.post("/storeFormData", async (req, res) => {
    console.log(req.body)

    try {
        const results = await db.query(
          "INSERT INTO formData(name, email, message) values ( $1, $2, $3) returning *",
          [req.body.name, req.body.email, req.body.message]
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


router.get("/getFormData", async (req, res) => {
    console.log(req.body)

    try {
        const results = await db.query(
          "SELECT * FROM formData"
        );
        console.log(results);
    
        res.status(201).json({
            packages: results.rows,
          
        });
      } catch (err) {
        console.log(err);
      } 


});


router.get("/getFormData", async (req, res) => {
    console.log(req.body)

    try {
        const results = await db.query(
          "SELECT * FROM ngproduct"
        );
        console.log(results);
    
        res.status(201).json({
            packages: results.rows,
          
        });
      } catch (err) {
        console.log(err);
      } 
});


router.get("/getProductData", async (req, res) => {
    console.log(req.body)

    try {
        const results = await db.query(
          "SELECT * FROM ngproduct"
        );
        console.log(results);
    
        res.status(201).json({
            packages: results.rows,
          
        });
      } catch (err) {
        console.log(err);
      } 
});

module.exports = router