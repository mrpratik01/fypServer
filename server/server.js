const express = require("express");
const bodyParser = require('body-parser')
const db = require("../server/db/index");
const morgan = require("morgan");
const { password } = require("pg/lib/defaults");
const app = express();

const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)

app.use(express.json());

//get all packages\\

app.use('/api', authRoutes)


// app.get("/api/v1/packages", async (req, res) => {
//   try {
//     const results = await db.query("select * from accounts");
//     console.log(results);
//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       data: {
//         packages: results.rows,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// //get a package
// app.get("/api/v1/packages/:id", async (req, res) => {
//   console.log(req.params.id);

//   try {
//     const results = await db.query(
//       `select * from accounts where user_id = ${req.params.id}`
//     );
//     console.log(results.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
//   res.status(201).json({
//     status: "success",
//     data: {
//       packages: "cotton",
//     },
//   });
// });

// //create a packages

// app.post("/api/v1/packages", async (req, res) => {
//   console.log(req.body);

//   try {
//     const results = await db.query(
//       "INSERT INTO accounts ( user_id,username, password, email) values ( $1, $2, $3, $4) returning *",
//       [req.body.user_id, req.body.username, req.body.password, req.body.email]
//     );
//     console.log(results);

//     res.status(201).json({
//       status: "success",
//       data: {
//         packages: results.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// // UPDATE accounts SET username = 'hash', password = "hashh", email = "emaill", where user_id = 5;

// //update packages

// app.put("/api/v1/packages/:id", async (req, res) => {
//   console.log(req.params.id);
//   console.log(req.body);

//   try {
//     const results = await db.query(
//       "UPDATE accounts SET username = $1, password = $2, email = $3 where user_id = $4 returning *",
//       [req.body.username, req.body.password, req.body.email, req.body.user_id]
//     );
//     console.log(results);
//     res.status(200).json({
//       status: "success",
//       data: {
//         packages: results.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// //delete packages

// app.delete("/api/v1/packages/:id", async (req, res) => {
//     console.log(req.params.id);

//     try{

//         const results = await db.query("DELETE FROM accounts where user_id = $1", [req.params.id])
//         res.status(204).json({
//             status: "success",
//           });


//     }catch (err){
//         console.log(err);

//     }

// });

const port = 3001;

app.listen(port, () => {
  console.log(`port is listening on port ${port} `);
});
