function add(){
    var name = document.getElementById("txtNome").value
    var price = document.getElementById("txtPreco").value
    if( name.lenght == 0){
        alert("o Campo nome é Obrigatorio")
    }else{
        if(price.lenght == 0){
            price = 0.0
        }
        var ajax = new XMLHttpRequest()

        ajax.onreadystatechange = function(){
            if( this.readyState == 4 & this.status == 201){
                alert("Produto" +name + " cadastrado!")
                buscarProdutos()
            }
        }

        ajax.open("POST" , "http://127.0.0.1:8001/product")
        ajax.setRequestHeader("Content-type" , "application/x-www-form-urlencoded")
        ajax.send  ("nome=" +name + "&preco=" +price)


    }
}
function buscarProdutos(){
    var table = document.getElementById("tblProdutos")
    var ajax = new XMLHttpRequest()

    ajax.onreadystatechange = function(){
        if( this.readyState == 4 & this.status == 200){
            const obj = JSON.parse( this.response)
            obj.forEach(prod => {
              if(document.getElementById("p" + prod.id) == null){
                linha = table.insertRow( -1 )
                linha.id = "p" +prod.id

                cellid = linha.insertCell( 0 )
                cellNome = linha.insertCell( 1)
                cellPreco = linha.insertCell( 2)
                cellExcluir = linha.insertCell(3)
                
                cellid.innerHTML = prod.id
                cellNome.innerHTML = prod.nome
                cellPreco.innerHTML = "R$" + prod.preco
                cellExcluir.innerHTML = '<button onclick="excluir('+ prod.id + ')"> X </button> '
            }  
            })
        }
        
    }

    ajax.open("GET" , "http://localhost:8001/product", true)
    ajax.send ()

}