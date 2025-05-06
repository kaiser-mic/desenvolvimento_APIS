const express = require("express")
const knex = require("knex")
const errors = require("http-errors")


const app = express()

app.use( express.json() )
app.use( express.urlencoded({extended : true }) )

const PORT = 8001
const conn = knex( {
    client : "mysql" ,
    connection :{
        host : "localhost",
        user : "root",
        password : "",
        database : "market"
    }
} )
app.get("/", (req, res) =>{
    res.json( {resposta : "Seja bem-vindo(a) à nossa Loja"} )
})
app.get("/product", (req, res, next) =>{
    conn( "produto" )
    .then(dados => res.json(dados))
    .catch(next)
})
app.get("/product/:idProd", (req, res, next) =>{
    const id = req.params.idProd
    conn( "produto" )
    .where("id ", id)
    .first()
    .then(dados => {
        if(!dados){
            return next(errors(404 , "Produto não encontrado"))
        }
        res.json(dados)

    })
    .catch(next)
})

app.post( "/product" , (req, res, next) => {
    conn("produto")
        .insert(req.body)
        .then(dados => {
            if( !dados ){
                return next(errors(400, "Erro ao inserir"))
            }
            res.status(201).json( {
                resposta : "produto inserido",
                id: dados[0]
            })
        }) 
        .catch(next)
}  )
app.put( "/product/:idprod" , (req, res, next) => {
    const id = req.params.idprod
    conn("produto")
        .where("id", id)
        .update(req.body)
        .then(dados => {
            if( !dados ){
                return next(errors(404, "Produto nao encontrado"))
            }
            res.status(200).json( {
                resposta : "produto editado",            })
        }) 
        .catch(next)
}  )

app.delete( "/product/:idprod" , (req, res, next) => {
    const id = req.params.idprod
    conn("produto")
        .where("id", id)
        .delete()
        .then(dados => {
            if( !dados ){
                return next(errors(404, "Produto nao encontrado"))
            }
            res.status(200).json( {
                resposta : "produto excluio",            })
        }) 
        .catch(next)
}  )





app.listen( PORT , () => {
    console.log(`servidor executando em: http://localhost:$`)
})
