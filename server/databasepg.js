const {Client} = require('pg')
const client = new Client ({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "onepieceD1",
    database: "fyp_database"

})


client.connect();

client.query(`select * from customer`, (err, res) => {
    if(!err){
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end;
})

