const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "onepieceD1",
    database: "fyp_database"
});
module.exports={
    query: (text, params) => pool.query(text, params),
}