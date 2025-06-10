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


app.get("/products" , async (req, res) => {
    try {
        const produtos = await conn( "produtos" ).select( "*" )
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

app.get("/orders/list" , async (req, res) => {
    try {
        const pedidos = await conn( "pedidos" ).select( "*" )
        res.json( pedidos )
    } catch (error) {
        console.error( error )       
        res.status(500).json( { error: "Erro ao buscar pedidos" } )
    }
})

app.post("/products/create" , async (req, res) => {
        const { nome, preco, quantidade, categoria_id } = req.body
        if ( !nome || !preco || !quantidade || !categoria_id ) {
            return res.status(400).json( { error: "Todos os campos são obrigatórios" } )
        }
        try {
            await conn( "produtos" )
                .insert( { nome, preco, quantidade, categoria_id } )
            res.status(201).json( { message: "Produto cadastrado com sucesso" } )
        } catch (error) {
            console.error( error )
            res.status(500).json( { error: "Erro ao cadastrar produto" } )
        }
    })

app.put("/products/update/:id" , async (req, res) => {
    const { id } = req.params
    const { nome, preco, quantidade, categoria_id } = req.body
    if ( !nome || !preco || !quantidade || !categoria_id ) {
        return res.status(400).json( { error: "Todos os campos são obrigatórios" } )
    }
    try {
        const updatedRows = await conn( "produtos" )
            .where( { id } )
            .update( { nome, preco, quantidade, categoria_id } )
        if ( updatedRows == 0 ) {
            return res.status(404).json( { error: "Produto não encontrado" } )
        }
        res.json( { message: "Produto atualizado com sucesso" } )
    } catch (error) {
        console.error( error )
        res.status(500).json( { error: "Erro ao atualizar produto" } )
    }
})

app.delete("/products/:id" , async (req, res) => {
    const { id } = req.params
    try {
        const deletedRows = await conn( "produtos" )
            .where( { id } )
            .del()
        if ( deletedRows == 0 ) {
            return res.status(404).json( { error: "Produto não encontrado" } )
        }
        res.json( { message: "Produto excluído com sucesso" } )
    } catch (error) {
        console.error( error )
        if( error.code == 'ER_ROW_IS_REFERENCED_2'){
            return res.status(409).json({ 
                message: "Não é possível excluir o produto, pois ele está associado a um ou mais pedidos." 
            })
        }
        res.status(500).json( { error: "Erro ao excluir produto" } )
    }
})