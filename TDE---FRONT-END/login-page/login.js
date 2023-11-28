var criar_Login = document.querySelector("#box-cad-log")
var formLogin = document.querySelector("#form-login")

function alerta(msg){
    var alert = document.querySelector("#alerta")
    alert.style.display = "block"
    alert.innerHTML = msg
  
    setTimeout(function(){
      alert.style.display = "none"
    }, 3000)
  }


function redirect(link){
    window.location.href = link
}
async function atualizarJson(taskId, Task){
    const url = `http://localhost:5000/users/${taskId}`
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

function validacao(event){

    event.preventDefault();

    var user = document.querySelector("#input_User").value
    var senha = document.querySelector("#input_Senha").value

    user = user.toLowerCase()
    senha = senha.toLowerCase()

    fetch("http://localhost:5000/users",{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then((data) =>{

        var atualUser = data.find((e) => e.user === user && e.password === senha)
        if(!!data.find((e) => e.user === user && e.password === senha)){
            sessionStorage.setItem("login", true)
            sessionStorage.setItem("id", atualUser.id)
            console.log("Login Concluido com sucesso")
            redirect("../html/index.html")
        }else{
            document.querySelector("#erroLogin").style.display = "flex"
        }
    })
    .catch((err)=> console.log(err))

    
}
formLogin.addEventListener('submit', validacao)




