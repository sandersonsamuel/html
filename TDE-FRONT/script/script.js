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