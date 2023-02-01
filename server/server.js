const express = require('express');
const db = require("./db")
const morgan = require("morgan")
const app = express();

app.use(express.json())


//get all packages
app.get("/api/v1/packages", async (req, res) => {
    try{
        const results = await db.query("select * from customer")
        console.log(results)
        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            packages: results.rows,
        }
        

     });

    } catch(err) {
        

        console.log(err)

    }
    
});

//get a package
app.get("/api/v1/packages/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    res.status(201).json({
        status: "success",
        data: {
            packages: "cotton"

            
        }
    })
}) 

//create a packages

app.post("/api/v1/packages", (req, res) => {
    console.log(req.body) 
})

//update packages

app.put("/api/v1/packages/:id",(req, res) => {
    console.log(req.params.id)
    console.log(req.body)

    res.status(200).json({
        status: "success",
        data: {
            packages: "cotton"

            
        }
    })
})


//delete packages

app.delete("/api/v1/packages/:id", (req, res) => {
    res.status(204).json({
        status: "success",
    })
})

const port = 3001;

app.listen(port, () => {
    console.log(`port is listening on port ${port} `)
})

