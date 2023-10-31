var radio = document.querySelector('.manual-btn')
var cont = 1 

setInterval(() => {
    proxImg()
}, 5000)

function proxImg(){
    cont++

    if (cont > 4){
        cont = 1
    }

    document.getElementById('radio'+cont).checked = true
}

//ABRINDO AS CATEGORIAS
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

