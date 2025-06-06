const express = require("express")
const knex = require("knex")
const errors = require("http-errors")

const app = express()

app.use( express.json() )
app.use( express.urlencoded( {extended : true} ) )

const PORT = 8001
const hostname = "localhost"

const conn = knex( { 
    client : "mysql" ,
    connection : {
        host : hostname ,
        user : "root" ,
        password : "" ,
        database : "bd_dsapi"
    }
} )

app.get("/" , (req, res) => {
    res.json( { resposta : "Seja bem-vindo(a) à nossa API"} )
} )

app.listen( PORT , () =>{
    console.log( `Loja executando em: http://localhost:${PORT}` )
} )