var formCC = document.querySelector("#form-cc")

function alerta(msg){
    var alert = document.querySelector("#alerta")
    alert.style.display = "block"
    alert.innerHTML = msg
  
    setTimeout(function(){
      alert.style.display = "none"
    }, 3000)
  }

function criar(){
    var cc_user = document.querySelector("#cc_user").value
    var cc_email = document.querySelector("#cc_email").value
    var cc_senha = document.querySelector("#cc_senha").value

    cc_user = cc_user.toLowerCase()
    cc_email = cc_email.toLowerCase()
    cc_senha = cc_senha.toLowerCase()



    if (cc_email === "" || cc_senha === "" || cc_user === ""){
        document.querySelector("#erroCriar").style.display = "flex"
    }else{
        const newUser = {
            "user": cc_user,
            "email": cc_email,
            "password": cc_senha
        };
        
        fetch("http://localhost:5000/users", {
            method: 'post',
            body: JSON.stringify(newUser),
            headers:{
                'Content-Type': 'application/json'
            }
    
        }).then(function(response){
            return response.text()
        }).then(function(text){
            redirect("/login-page/index.html")
        }).catch(function(error){
            console.error(error)
        })
    }

}

formCC.addEventListener('submit', criar)
