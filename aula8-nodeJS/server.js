const http = require("http")
const mysql = require("mysql")

const hostname = "127.0.0.1"
const port = 3000

const conn = mysql.createConnection( {
    host : "localhost",
    user : "root",
    password : "",
    database : "market"
    
} )


const server = http.createServer( (req, res) => {
    req.statusCode = 200
    res.setHeader("content-type" , "application/json" )

    try{
        if(conn.state != "authenticated"){
            conn.connect( function( erro ){
                if (erro){
                    res.end(JSON.stringify({resposta : "erro na conexão" ,  erro : erro }))
                }
            } )
        }else{
            consultar(res)
        }
    }
    catch(error){
        res.end('{"resposta" : "erro no servidor"}')
    }
} )
function consultar(res){
    var sql = "SELECT * FROM produto ORDER BY nome "
    conn.query(sql, (err, result, fields ) => {
        if(err){
            res.end(JSON.stringify({resposta : "erro na consulta", erro : err}))
        }else{
            res.end(JSON.stringify(result))
        }
    } )
}
server.listen(port, hostname, () => {
    console.log(`servidor rodandno em: http://${hostname}:${port}`)
})

