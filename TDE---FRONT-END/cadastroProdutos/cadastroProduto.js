var form = document.querySelector("#form-cad-prod")

function alerta(msg){
    var alert = document.querySelector("#alerta")
    alert.style.display = "block"
    alert.innerHTML = msg
  
    setTimeout(function(){
      alert.style.display = "none"
    }, 3000)
  }

function newProd(event) {
    event.preventDefault();

    var nomeProd = document.querySelector("#nomeProd").value
    var precoProd = parseFloat(document.querySelector("#precoProd").value)
    var descontoProd = parseFloat(document.querySelector("#descontProd").value)
    var categProdPrin = document.querySelector("#categProdPrin").value
    var categProdSec = document.querySelector("#categProdSec").value
    var imgInput = document.querySelector("#imgProd").files[0]

    var reader = new FileReader();

    reader.onloadend = function() {
        const newProduto = {
            "nome": nomeProd,
            "preco": precoProd,
            "desconto": descontoProd,
            "categoriaPrincipal": categProdPrin,
            "categoriaSecundario": categProdSec,
            "imagem": reader.result
        };

        fetch("http://localhost:5000/produtos", {
            method: 'post',
            body: JSON.stringify(newProduto),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
                return response.text()
            }
            throw new Error('Erro ao enviar o formulário')
        }).then(function(text) {
            console.log(text)
        }).catch(function(error) {
            console.error(error)
        });
    };

    if (imgInput) {
        reader.readAsDataURL(imgInput)
    }
}

form.addEventListener('submit', newProd);
