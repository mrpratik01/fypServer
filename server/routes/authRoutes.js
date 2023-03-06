const express = require("express");
const router = express.Router();
const db = require("../db/index");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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

router.post("/signup", async (req, res) => {
  const { name, email, phoneNumber, password, confirmPassword } = req.body;
  


async function checkEmailExists(email) {


  try {
    // define the SQL query
    const sqlQuery = 'SELECT COUNT(*) FROM accounts WHERE email = $1';

    // execute the query
    const result = await db.query(sqlQuery, [email]);

    const emailExists = result.rows[0].count > 0;

    return emailExists;
  } catch (err) {
    console.error('Error executing query', err);
  } 
}



const emailToCheck = email;

checkEmailExists(emailToCheck)
  .then((emailExists) => {
    console.log(`Email ${emailToCheck} exists: ${emailExists}`);
  })
  .catch((err) => {
    console.error('Error checking email', err);
  });




  if (password !== confirmPassword) {
    return res
      .status(422)
      .send({ error: "Your Confirm Password doesn't match with password " });
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.json({
          message: "something went wrong, try again",
        });
      }
      else {
        const results = await db.query(
          "INSERT INTO accounts ( username, password, email, phoneNumber) values ( $1, $2, $3, $4) returning *",
          [name, hash, email, phoneNumber]
        );
        console.log(results);
      }
    });
  }

  // res.send('this is a  signup page')
  // const {username, password, email, phoneNumber }  = req.body;

  // if(!username || !password || !email || !phoneNumber){
  //   return res.status(422).send({error: "please fill all the fields"})
  // }

  // async function userExists(email) {
  //   const query = {
  //     text: 'SELECT COUNT(*) FROM users WHERE email = $1',
  //     values: [email],
  //   };

  //   const result = await db.query(query);
  //   const count = parseInt(result.rows[0].count);

  //   return count > 0;
  // }

  // async function createUser(email, password) {
  //   if (await userExists(email)) {
  //     throw new Error('User already exists');
  //   }

  //   // create user in database
  //   const query = {
  //     text: 'INSERT INTO users (email, password) VALUES ($1, $2)',
  //     values: [email, password],
  //   };

  //   await db.query(query);
  // }
});

router.post("/login", async (req, res) => {



  const { email, password } = req.body;

  try {
    console.log(email,password)
    // check if user exists in database
    const sqlQuery = `SELECT * FROM accounts WHERE email = '${email}' `;
    console.log(sqlQuery)
    const result = await db.query(sqlQuery);
    

    if (!result) {
      
      return res.status(401).json({ error: 'Invalid emails or password' });
      
    }else{
    // verify password
    const user = result.data;
    console.log(user)
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const username = {name: email}

    // generate JWT token
    const token = jwt.sign(username,);

    res.json({ token });

    }

  } catch (err) {
    console.error('Error logging in', err);
    res.status(500).json({ error: 'Internal server error' });
  }




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
});

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
