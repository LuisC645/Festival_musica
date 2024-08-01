document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra=document.querySelector('.header');
    const sobreFestival=document.querySelector('.sobre-festival');
    const body=document.querySelector('body')

    window.addEventListener('scroll', function(){

        if ( sobreFestival.getBoundingClientRect().top < 0 ){
            barra.classList.add('fijo')
            body.classList.add('body-scroll')
        } else{
            barra.classList.remove('fijo')
            body.classList.remove('body-scroll')
        }
    })
}

function scrollNav(){
    const enlaces=document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach(enlace=>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccion=document.querySelector(e.target.attributes.href.value)
            seccion.scrollIntoView({behavior:'smooth'})
        });
    });
}

//galeria

function crearGaleria(){
    const galeria =document.querySelector('.galeria-imagenes');
    
    for(let i=1; i<=12; i++){
        const imagenes=document.createElement('picture');
        imagenes.innerHTML=`
            <source srcset='build/img/thumb/${i}.avif' type='image/avif'>
            <source srcset='build/img/thumb/${i}.webp' type='image/webp'>
            <img loading='lazy' width='200' height='300' srcset='build/img/thumb/${i}.jpg' alt="image">   
        `;
        imagenes.onclick=function(){
            mostrarImagen(i)
        };

        galeria.appendChild(imagenes);
    }
}

function mostrarImagen(id){
    const imagen=document.createElement('picture');
    imagen.innerHTML=`
        <source srcset='build/img/grande/${id}.avif' type='image/avif'>
        <source srcset='build/img/grande/${id}.webp' type='image/webp'>
        <img loading='lazy' width='200' height='300' srcset='build/img/grande/${id}.jpg' alt="image">   
    `;

    
    const overlay = document.createElement('DIV');
    //overlay es el efecto de mostrar la imagen grande
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick=function(){
        const body=document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove()
        //al hacer esto al overlay hace que al hacer click en cualquier parte se cierre
    }

    //crear el boton
    const cerrarFoto=document.createElement('P');
    cerrarFoto.textContent='X';
    cerrarFoto.onclick=function(){
        const body=document.querySelector('body');
        body.classList.remove('fijar-body');
        //debemos quitar la clase ya que en la hoja de estilos si esta no se puede hacer scroll
        overlay.remove()
        //remove quita el overlay osea cierra la imagen grande
    }
    cerrarFoto.classList.add('bt-cerrar');

    overlay.appendChild(cerrarFoto);

    //añadir al html
    const body=document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');


}