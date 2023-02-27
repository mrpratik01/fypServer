// const express = require('express')
// const router = express.Router();
// const db = require("../db/index");
// const {jwtkey} = require('../keys')
// const jwt = require('jsonwebtoken')


// app.get("/history", async (req, res) => {

//     try {

//         const individualID = 1;
//         const results = await db.query(`select * from packages where id = ${individualID}`);
//         console.log(results);
//         res.status(200).json({
//           status: "success",
//           results: results.rows.length,
//           data: {
//             packages: results.rows,
//           },
//         });
//       } catch (err) {
//         console.log(err);
//       }



// })