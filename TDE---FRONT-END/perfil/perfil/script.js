cardInfo = document.querySelector("#cardInfo")

idUser = sessionStorage.getItem("id")

function alerta(msg){
    var alert = document.querySelector("#alerta")
    alert.style.display = "block"
    alert.innerHTML = msg
  
    setTimeout(function(){
      alert.style.display = "none"
    }, 3000)
}

fetch("http://localhost:5000/users",{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then((data) =>{

        userLogado = data.find(e=> e.id == idUser)
        console.log(userLogado);

        cardInfo.innerHTML = `
        <div class="bg-secondary-subtle p-5 d-flex flex-column justify-content-evenly rounded-3" id="infocard">
            <h1 class = "text-capitalize">Nome: ${userLogado.user} </h1>
            <h1>Email: ${userLogado.email} </h1>
            <h1 class="d-flex gap-5">Senha: <button onclick="alerta('Confira o seu Email!')" class="btn btn-primary">Verificar no e-mail</button> </h1>
        </div>

    `

    })

