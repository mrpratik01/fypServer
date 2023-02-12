const jwt = require('jsonwebtoken');
const db = require("../db/index");
const {jwtkey} = require("../keys")


module.exports = (req, res, next) =>
{

    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).send({error:"you must be logged in"})
    }

    const token = authorization.replace()
    jwt.verify(token, jwtkey, async (err, payload)=> {
        if(err){
            return res.status(401).send({error: "you must be logged in"})
        }

        const {userId} = payload

    })
} 

