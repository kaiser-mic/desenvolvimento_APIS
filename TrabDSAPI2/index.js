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


app.get("/products" , (req, res) => {
    try {
        const produtos =  conn( "produtos" ).select( "*" )
        res.json( produtos )
    } catch (error) {
        console.error( error )
        res.status(500).json( { error: "Erro ao buscar produtos" } )
    }
})

app.put("/signup" , (req, res) => {
    const { nome, altura, nascim, cidade_id } = req.body

    if ( !nome || !altura || !nascim || !cidade_id ) {
        return res.status(400).json( { error: "Todos os campos são obrigatórios" } )
    }

    conn( "clientes" )
        .insert( { nome, altura, nascim, cidade_id } )
        .then( () => {
            res.status(201).json( { message: "Usuário cadastrado com sucesso" } )
        } )
        .catch( error => {
            console.error( error )
            res.status(500).json( { error: "Erro ao cadastrar usuário" } )
        } )
})