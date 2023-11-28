var container = document.querySelector("#container");

var atualUser = sessionStorage.getItem("id");

function alerta(msg){
  var alert = document.querySelector("#alerta")
  alert.style.display = "block"
  alert.innerHTML = msg

  setTimeout(function(){
    alert.style.display = "none"
  }, 3000)
}

async function deleteJson(id){
  fetch(`http://localhost:5000/carrinho/${id}`,{
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
}

async function atualizarJson(taskId, Task){

  const url = `http://localhost:5000/carrinho/${taskId}`
  const options = {
      method: 'PATCH',
      headers:{
          'Content-type': 'application/json',
      },
      body: JSON.stringify(Task)
  }

  const response = await fetch(url, options)
  if (response.ok){
      console.log ("Tarefa Atualizada!!!")
  }else{
      console.log("falha")
  }
}

fetch('http://localhost:5000/carrinho')
  .then(response => response.json())
  .then(data => {
    var total = 0;
    userCart = data.filter((e) => e.userId == atualUser);
    var promises = userCart.map((produto) => {
      return fetch("http://localhost:5000/produtos", {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
        },
      }).then((resp) => resp.json())
        .then((produtosData) => {
          var produtoUser = produtosData.find((e) => e.id === produto.produtoId);
          var subtotal = Number(produto.qteProd) * Number(produtoUser.preco);
          total += subtotal;

          var produtos = document.createElement("div");
          produtos.className = "bg-secondary-subtle prod-cart d-flex align-items-center px-3";
          produtos.innerHTML = `
          
            
            <img src=${produtoUser.imagem}>
            <p class="col-3 m-0">${produtoUser.nome}</p>
            <p class="m-0 col-2 text-center">R$${produtoUser.preco}</p>
            <p class="m-0 col-2 text-center"><button onclick="modQte(${produtoUser.id}, ${-1}), event" class="btn btn-danger btnPM">-</button>${produto.qteProd}<button onclick="modQte(${produtoUser.id}, ${+1})" class="btn btn-primary btnPM">+</button></p>
            <p class="m-0 col-2 text-center">R$${subtotal}</p>
            <button onclick = "deleteJson(${produto.id})" id="btn-lixo" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
          `;
          container.appendChild(produtos);
        });
    });

    Promise.all(promises).then(() => {
      var boxCart = document.querySelector("#box-cart");
      var div = document.createElement("div");
      div.className = "bg-secondary-subtle d-flex flex-column p-5 justify-content-around";
      div.id = "resume-buy";

      div.innerHTML = `
        <h3 class="text-center my-3">Resumo das Compras</h3>
        
        <div class="d-flex justify-content-between" id="box-frete">
            <p class="m-2">Frete: </p>
            <p class="m-2 fw-medium">R$ ${total * 0.15}</p>
        </div>

        <div class="d-flex justify-content-between" id="box-total">
            <p class="m-2">Subtotal: </p>
            <p class="m-2 fw-medium">R$ ${total}</p>
        </div>

        <div class="d-flex justify-content-between" id="add-Cupom">
            <input type="text" class="form-control my-0" placeholder="Cupom de desconto" required autofocus id="input_User">
            <button class="btn btn-success">Validar</button>
        </div>
        <button class="btn btn-primary p-3">Finalizar Compra</button>
      `;
      boxCart.appendChild(div);
    });
  });

  function modQte(id, pm, event){
    
    fetch('http://localhost:5000/carrinho')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    modProd = data.find((e)=> e.produtoId == id)
    console.log(modProd.id);

    if (modProd.qteProd > 1 || pm == +1){
      modProd.qteProd += pm
      atualizarJson(modProd.id, modProd)
    }

    
  })

  }
