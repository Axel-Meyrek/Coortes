/* Variables ---------------------------------------------------------------------------- */
/* Botones */
const btnVentanaCreateProducts = document.querySelector('#btnVentanaCreateProducts')
const btnVentanaCreateGastos = document.querySelector('#btnVentanaCreateGastos')
const btnVentanaTusProductos = document.querySelector('#btnVentanaTusProductos')
const btnVentanaRegistrarVentas = document.querySelector('#btnVentanaRegistrarVentas')
const btnVentanaVentas = document.querySelector('#btnVentanaVentas')
const btnVentanaCortes = document.querySelector('#btnVentanaCortes')
const btnDarkMode = document.querySelector('#btnDarkMode')
const btnMenu = document.querySelector('#btnMenu')
const btnFullScreen = document.querySelector('#btnFullScreen')

/* Ventanas */
const ventanaCreateProducts = document.querySelector('#ventanaCreateProducts')
const ventanaCreateGastos = document.querySelector('#ventanaCreateGastos')
const ventanaTusProductos = document.querySelector('#ventanaTusProductos')
const ventanaRegistrarVentas = document.querySelector('#ventanaRegistrarVentas')
const ventanaVentas = document.querySelector('#ventanaVentas')
const ventanaCortes = document.querySelector('#ventanaCortes')
const ventanaRecapitulacion = document.querySelector('#ventanaRecapitulacion')

const ventanaResumenVenta = document.querySelector('#ventanaResumenVenta')
const ventanaPreLoader = document.querySelector('#ventanaPreLoader')

/* Inicializaciones */
let isFullscreen = false


/* Funciones ---------------------------------------------------------------------------- */
const preLoader = () => {
    ventanaPreLoader.classList.add('ventanaFlotante')
    ventanaPreLoader.classList.add('ventanaFlotante--active')
    setTimeout( () => {
        mostrarVentanaRegistrarVentas()
    }, 2500)
    setTimeout(() => {ventanaPreLoader.classList.remove('ventanaFlotante--active')}, 2300)
    setTimeout( () => {ventanaPreLoader.remove()},4000)
    
}
const ocultarVentanas = () => {
    ventanaCreateProducts.classList.remove('ventanaFlotante--active')
    ventanaCreateGastos.classList.remove('ventanaFlotante--active')
    ventanaTusProductos.classList.remove('ventanaFlotante--active')
    ventanaRegistrarVentas.classList.remove('ventanaFlotante--active')
    ventanaVentas.classList.remove('ventanaFlotante--active')
    ventanaCortes.classList.remove('ventanaFlotante--active')
    ventanaResumenVenta.classList.remove('ventanaFlotante--active')
    ventanaRecapitulacion.classList.remove('ventanaFlotante--active')
    resetNavIcons()
}

const resetNavIcons = () => {
    btnVentanaCreateProducts.classList.remove('navIcon--active')
    btnVentanaCreateGastos.classList.remove('navIcon--active')
    btnVentanaTusProductos.classList.remove('navIcon--active')
    btnVentanaRegistrarVentas.classList.remove('navIcon--active')
    btnVentanaVentas.classList.remove('navIcon--active')
    btnVentanaCortes.classList.remove('navIcon--active')
}

const mostrarVentantaCreateProducts = () => {
    ocultarVentanas()
    ventanaCreateProducts.classList.add('ventanaFlotante--active')
    btnVentanaCreateProducts.classList.add('navIcon--active')
}

const mostrarVentanaCreateGastos = () => {
    ocultarVentanas()
    ventanaCreateGastos.classList.add('ventanaFlotante--active')
    btnVentanaCreateGastos.classList.add('navIcon--active')
}

const mostrarVentanaTusProductos = () => {
    ocultarVentanas()
    ventanaTusProductos.classList.add('ventanaFlotante--active')
    btnVentanaTusProductos.classList.add('navIcon--active')
}
const mostrarVentanaRegistrarVentas = () => {
    ocultarVentanas()
    ventanaRegistrarVentas.classList.add('ventanaFlotante--active')
    btnVentanaRegistrarVentas.classList.add('navIcon--active')
}

const mostrarVentanaVentas = () => {
    ocultarVentanas()
    ventanaVentas.classList.add('ventanaFlotante--active')
    btnVentanaVentas.classList.add('navIcon--active')
}

const mostrarVentanaCortes = () => {
    ocultarVentanas()
    ventanaCortes.classList.add('ventanaFlotante--active')
    btnVentanaCortes.classList.add('navIcon--active')
}

const darkMode = () => {
    document.body.classList.toggle('darkMode')
    btnDarkMode.classList.toggle('rotate')
}

const mostrarMenu = () => {
    const conteinerMenu = document.querySelector('.menuItems')
    conteinerMenu.classList.toggle('menuItems--active')
}

const fullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        isFullscreen = true;
        btnFullScreen.classList.toggle('rotate')
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            isFullscreen = false;
            btnFullScreen.classList.toggle('rotate')
        }
    }
}







/* Eventos ------------------------------------------------------------------------------ */
btnVentanaCreateProducts.addEventListener('click', mostrarVentantaCreateProducts)
btnVentanaCreateGastos.addEventListener('click', mostrarVentanaCreateGastos)
btnVentanaTusProductos.addEventListener('click', mostrarVentanaTusProductos)
btnVentanaRegistrarVentas.addEventListener('click', mostrarVentanaRegistrarVentas)
btnVentanaVentas.addEventListener('click', mostrarVentanaVentas)
btnVentanaCortes.addEventListener('click', mostrarVentanaCortes)
btnDarkMode.addEventListener('click', darkMode)
btnMenu.addEventListener('click', mostrarMenu)
btnFullScreen.addEventListener('click', fullScreen)

document.addEventListener('DOMContentLoaded', preLoader)

