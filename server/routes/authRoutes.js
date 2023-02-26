const express = require('express')
const router = express.Router();
const db = require("../db/index");
const {jwtkey} = require('../keys')
const jwt = require('jsonwebtoken')



// router.post('/signup', async(req, res) => {

//   try {
//     const results = await db.query(
//       "INSERT INTO accounts ( user_id,username, password, email) values ( $1, $2, $3, $4) returning *",
//       [req.body.user_id, req.body.username, req.body.password, req.body.email]
//     );
//     console.log(results);

//     const token = jwt.sign({user_id:user._id},jwtKey)
//     res.send({token})

//     res.status(201).json({
//       status: "success",
//       data: {
//         packages: results.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// })


router.post('/signup', async (req, res) => {

  res.send('this is a  signup page')
  const {username, password, email, phoneNumber }  = req.body;

  if(!username || !password || !email || !phoneNumber){
    return res.status(422).send({error: "please fill all the fields"})
  }


  async function userExists(email) {
    const query = {
      text: 'SELECT COUNT(*) FROM users WHERE email = $1',
      values: [email],
    };
  
    const result = await db.query(query);
    const count = parseInt(result.rows[0].count);
  
    return count > 0;
  }

  async function createUser(email, password) {
    if (await userExists(email)) {
      throw new Error('User already exists');
    }
  
    // create user in database
    const query = {
      text: 'INSERT INTO users (email, password) VALUES ($1, $2)',
      values: [email, password],
    };
  
    await db.query(query);
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

