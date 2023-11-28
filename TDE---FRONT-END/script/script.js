var radio = document.querySelector('.manual-btn')
var cont = 1 
const swiper = document.querySelector('.swiper').swiper;

function alerta(msg){
  var alert = document.querySelector("#alerta")
  alert.style.display = "block"
  alert.innerHTML = msg

  setTimeout(function(){
    alert.style.display = "none"
  }, 3000)
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var boxCarrinho = document.querySelector("#box-carrinho")

if (sessionStorage.getItem("login") === null){
  boxCarrinho.setAttribute("href", "../login-page/index.html")
}

function redirect(link){
  window.location.href = link
}


async function atualizarJson(taskId, Task){
  const url = `http://localhost:5000/carrinho/${taskId}`
  const options = {
      method: 'PUT',
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

function logOut(event){
  event.preventDefault()
  sessionStorage.clear()
  window.location.reload()
}

//ABRINDO E FECHAnDO AS CATEGORIAS
var nav_categorias = document.getElementById("nav-categorias")
var categorias = document.getElementById("categorias")
var btn_categorias = document.getElementById("tds-categorias")

btn_categorias.addEventListener("mouseenter", function(){
    categorias.style.display = "flex"
    
})
nav_categorias.addEventListener("mouseleave", function(){
    categorias.style.display = "none"
})

categorias.addEventListener("mouseleave", function(){
    categorias.style.display = "none"
})

function addCart(id, comprar){
  if (sessionStorage.getItem("login")){
    userId = Number(sessionStorage.getItem("id"))

    fetch('http://localhost:5000/carrinho')
    .then(response => response.json())
    .then(data => {
      
      //filtrando os produtos para apenas o que são do id atual
      userCart = data.filter((e)=> e.userId === userId)

      //pegando o obj que é duplicado
      objProd = userCart.find((e)=> e.produtoId == id)


      //verificando se é duplicado
      if (!!(userCart.find((e)=> e.produtoId == id))){

        //enviando o mesmo obj de volta, mas agora com um qteProd a mais
        objProd.qteProd += 1
        atualizarJson(objProd.id, objProd)
        alerta("Adicionado com sucesso ao carrinho")

      }else{
        produtoCart ={
          produtoId: id,
          userId: userId,
          qteProd: 1
        }
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(produtoCart),
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/carrinho", requestOptions)
          .then(response => response.text(
            alerta("Adicionado com sucesso ao carrinho")
          ))
          .then(result => console.log(result))
      }
      if (comprar) {
        redirect("../carrinho/index.html")
      }
    })
    
  }else{
    redirect("../login-page/index.html")
  }

}

function comprarProd(id) {
  addCart(id, true)
}

//Slider Configuração swiper.js
setTimeout(function () {

  const swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },

    speed:500,

    //Setando a Direção
    direction: 'horizontal',
    loop: true,
  
    // Setando a paginação
    pagination: {
      el: '.swiper-pagination',
    },

    //definindo as setinhas de navegação
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  }, 1000);


//pegando as ofertas do "banco"
fetch("http://localhost:5000/produtos",{
  method:"GET",
  headers:{
      'Content-type': 'application/json',
  },
})
.then((resp) => resp.json())
.then((data) =>{

  //filtrando apenas as com categoria "Ofertas"
  var produto = (data.find((e)=> e.categProdSec === "Ofertas"))
  var containerOfertas = document.querySelector("#container-ofertas");

  //map para que cada oferta seja imprimida no front
  var prodNomes = data.map(function(produto){


    //criando a div que vai comportar os produtos
    var produtos = document.createElement('div');
    produtos.className = "d-flex justify-content-center col-xl-3 col-md-4 pb-5"

    //colocando os elementos concatenados dentro da div
    produtos.innerHTML = `
    <div class="mp-item box-produtos img-thumbnail w-75">
        <img src="${produto.imagem}" alt="" class="img-thumbnail" id="img-produto">
        <p class="small m-0 text-uppercase">${produto.nome}</p>
        <span class="m-0">
            <div class = "d-flex gap-2">
              <p class="h3 m-0 fw-bold m-0">${'R$'+ produto.preco}</p>
              ${produto.desconto > 0 ? `<p class="h3 m-0 fw-bold m-0 small"><s>R$${(produto.preco + (produto.preco * (produto.desconto/100))).toString()}</s></p>` : '<p class="small text-success m-0">&nbsp</p>'}
            </div>
            ${produto.desconto > 0?'<p class="small text-success m-0">' + produto.desconto +'%OFF</p>': '<p class="small text-success m-0">&nbsp</p>'}
        </span>
        <span id="box-comprar">
          <button class="btn btn-success" onclick=" comprarProd(${produto.id})">Comprar</button>
          <button class="btn btn-primary" onclick="addCart(${produto.id})">
              <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </span>
    </div>
    `;

    //colocando a div filha dentro da div pai que foi pega anteriormente  
    containerOfertas.appendChild(produtos);

  })

})
.catch((err)=> console.log(err))

var loginBox = document.querySelector("#box-login")
var login = sessionStorage.getItem("login")

if (login){

  var btnLogado = document.createElement('div')
  btnLogado.className = "dropdown"
  var userLogado = sessionStorage.getItem("id")

  fetch(`http://localhost:5000/users/${userLogado}`,{
  method:"GET",
  headers:{
      'Content-type': 'application/json',
  },
  })
  .then((resp) => resp.json())
  .then((data) =>{
    loginBox.className = "d-flex"
    btnLogado.innerHTML = `
    <button class="btn btn-outline-primary dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${data.user}&nbsp
                <i class="fa-solid fa-user"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="../perfil/perfil/index.html">Perfil</a></li>
                <li><a class="dropdown-item" href="#" onclick="logOut(event)">Sair</a></li>
              </ul>
              `
    loginBox.appendChild(btnLogado)

  })

}else{
  var btnLogCreat = document.createElement('a')
  loginBox.className = "d-flex"
  btnLogCreat.href = "../login-page/index.html"
  btnLogCreat.className = "nav-link nav-item"
  btnLogCreat.id = "box-cad-log"

  btnLogCreat.innerHTML = `<label for="btn-cadastro" class="box-login">
  Entre ou Cadastre-se
</label>`

  loginBox.appendChild(btnLogCreat)

}
  


