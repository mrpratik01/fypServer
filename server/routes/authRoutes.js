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


router.post('/login', async (req, res) => {
  // const { username, password } = req.body;
  // // Query the database for the user with the given username and password
  // pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {
  //     if (error) {
  //         console.error(error);
  //         res.status(500).send('Error querying database');
  //     } else if (results.rows.length === 0) {
  //         res.status(401).send('Invalid credentials');
  //     } else {
  //         // User is authenticated, so create a session or token and send it back to the client
  //         const sessionId = generateSessionId(); // some function to generate a session ID
  //         res.json({ sessionId });
  //     }
  // });

  // const { username, password } = req.body;

  // db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {

  //   if (error) {
  //     console.error(error);
  //     res.status(500).send('Error querying database');
  //   }else if (results.rows.length === 0) {
  //     res.status(401).send('Invalid credentials');
  // } else {
  //     // User is authenticated, so create a JWT and send it back to the client
  //     const userId = results.rows[0].id; // assume user ID is stored in a column called "id"
  //     const token = jwt.sign({ userId }, secretKey);
  //     res.json({ token });
  // }
  // }


    const { username, password } = req.body;
    // Query the database for the user with the given username and password
    pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error querying database');
        } else if (results.rows.length === 0) {
            res.status(401).send('Invalid credentials');
        } else {
            // User is authenticated, so create a session or token and send it back to the client
            const sessionId = generateSessionId(); // some function to generate a session ID
            res.json({ sessionId });
        }
    });


    const 


  // try {
  //   const results = await db.query(
  //     "INSERT INTO accounts ( user_id,username, password, email) values ( $1, $2, $3, $4) returning *",
  //     [req.body.user_id, req.body.username, req.body.password, req.body.email]
  //   );
  //   console.log(results);

  //   const token = jwt.sign({user_id:user._id},jwtKey)
  //   res.send({token})

  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       packages: results.rows[0],
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

})


// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   // Query the database for the user with the given username and password
//   pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (error, results) => {
//       if (error) {
//           console.error(error);
//           res.status(500).send('Error querying database');
//       } else if (results.rows.length === 0) {
//           res.status(401).send('Invalid credentials');
//       } else {
//           // User is authenticated, so create a session or token and send it back to the client
//           const sessionId = generateSessionId(); // some function to generate a session ID
//           res.json({ sessionId });
//       }
//   });
// });


module.exports = router;

