function lerXML(){
    tabela = document.getElementById("tableXML");
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            dadosXML = this.responseXML;
            clientes = dadosXML.getElementsByTagName("produto");
            conteudo =  "<tr> " +
                        "     <th>ID</th> " +
                        "     <th>Nome</th> " +
                        "     <th>Altura</th> " +
                        "</tr>";
            for( i = 0 ; i < clientes.length ; i++){
                id = produtos[i].getElementsByTagName("id");
                nome = produtos[i].getElementsByTagName("nome");
                preco = produtos[i].getElementsByTagName("preco");
                conteudo += "<tr>";
                conteudo += " <td>"+id[0].childNodes[0].nodeValue+"</td>";
                conteudo += " <td>"+nome[0].childNodes[0].nodeValue+"</td>";
                conteudo += " <td>"+altura[0].childNodes[0].nodeValue+"</td>";
                conteudo += "</tr>";
            }
            tabela.innerHTML = conteudo;
        }
    };
    req.open("GET", "dados.xml", true);
    req.send();
}