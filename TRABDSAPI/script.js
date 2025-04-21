function lerXML(){
    tabela = document.getElementById("tableXML");
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            dadosXML = this.responseXML;
            clientes = dadosXML.getElementsByTagName("cliente");
            conteudo =  "<tr> " +
                        "     <th>ID</th> " +
                        "     <th>Nome</th> " +
                        "     <th>Altura</th> " +
                        "</tr>";
            for( i = 0 ; i < clientes.length ; i++){
                id = clientes[i].getElementsByTagName("id");
                nome = clientes[i].getElementsByTagName("nome");
                altura = clientes[i].getElementsByTagName("altura");
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