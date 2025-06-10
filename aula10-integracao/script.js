function add(){
    var name = document.getElementById("txtNome")
    var price = document.getElementById("txtPreco")
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
    
}