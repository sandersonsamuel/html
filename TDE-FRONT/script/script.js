var radio = document.querySelector('.manual-btn')
var cont = 1 
const swiper = document.querySelector('.swiper').swiper;

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


setTimeout(function () {

  swiper = new Swiper('.swiper', {
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
  

swiper = new Swiper('.swiper', {

    speed:1300,

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