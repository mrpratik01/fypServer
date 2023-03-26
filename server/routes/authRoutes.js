const express = require("express");
const router = express.Router();
const db = require("../db/index");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  try {
    const data = await db.query(`SELECT * FROM accounts WHERE email= $1;`, [
      email,
    ]);
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          name,
          email,
          phoneNumber,
          password: hash,
        };
        var flag = 1;

        console.log(name, email, phoneNumber, password)

        db.query(
          `INSERT INTO accounts (username, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
          [user.name, user.email, user.phoneNumber, user.password],


          
        ).then(data=>res.status(200).send("successfully created")).catch(err => {
          res.status(500).send(err)
        })  ;  


      });
    }
  } catch (err) {
    s;
    console.log(err);
    res.status(500).json({
      error: "Database error while registering user!",
    });
  }
});

router.post("/login-admin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    const result = await db.query('SELECT * FROM admin WHERE email = $1', [email]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    console.log(user)

    const isPasswordValid = await bcrypt.compare(password, user.password);



    console.log (isPasswordValid)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/register-admin", async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  try {
    const data = await db.query(`SELECT * FROM admin WHERE email= $1;`, [
      email,
    ]);
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          name,
          email,
          phonenumber,
          password: hash,
        };
        var flag = 1;

        db.query(
          `INSERT INTO admin (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
          [user.name, user.email, user.phonenumber, user.password],


          
        ).then(data=>res.status(200).send("successfully created")).catch(err => {
          res.status(500).send(err)
        })  ;  


      });
    }
  } catch (err) {
    s;
    console.log(err);
    res.status(500).json({
      error: "Database error while registering user!",
    });
  }
});




router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);
    // check if user exists in database
    const sqlQuery = `SELECT * FROM accounts WHERE email = '${email}' `;
    console.log(sqlQuery);
    const result = await db.query(sqlQuery);
    if (!result) {
      return res.status(401).json({ error: "Invalid emails or password" });
    } else {
      // verify password
      const user = result.data;
      console.log(user);
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const username = { name: email };

      // generate JWT token
      const token = jwt.sign(username);

      res.json({ token });
    }
  } catch (err) {
    console.error("Error logging in", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

