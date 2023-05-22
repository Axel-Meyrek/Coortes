/* Varibles ---------------------------------------------------------------------- */
/* Inputs */
const inputCreateNameProduct = document.querySelector('#inputCreateNameProduct')
const inputCreatePrecioProduct = document.querySelector('#inputCreatePrecioProduct')
const inputCreateNameGasto = document.querySelector('#inputCreateNameGasto')
const inputCreatePrecioGasto = document.querySelector('#inputCreatePrecioGasto')
const inputRegistrarVenta = document.querySelector('#inputRegistrarVenta')
const inputCantidad = document.querySelector('#inputCantidad')

/* Botones */
const btnCreateProduct = document.querySelector('#btnCreateProduct')
const btnCreateGasto = document.querySelector('#btnCreateGasto')
const btnAumentarCantidad = document.querySelector('#btnAumentarCantidad')
const btnRegistrarVenta = document.querySelector('#btnRegistrarVenta')
const btnCargarVentasDiarias = document.querySelector('#btnCargarVentasDiarias')
const btnVentanaResumenDelDia = document.querySelector('#btnVentanaResumenDelDia')
const btnSaveCorte = document.querySelector('#btnSaveCorte')
const btnSalirRecapitulacion = document.querySelector('#btnSalirRecapitulacion')

/* Inicializaciones */
/* IMPORTANTES */
let productos = []
let gastos = []
let totalGastos = 0

/* EVENTUALES */
let ventasDelMomento = []
let ventasDelDia = []
let totalVentasDia = 0

/* MOMENTANEAS */
let totalDelmomento = 0
let nameProducts = []
let cotizacion = {}

let cortes = []
let peticion





/* Funciones --------------------------------------------------------------------- */


/* Crear Productos */
const createProduct = e => {
    /* Prevenir el evento del boton */
    e.preventDefault()

    recuperarInputsProduct()

    resetInputProducts()

    actualizarLocalStorach('Productos', productos)

    sincronizarConStorachProducts()

    inyectarProductos()

    recuperarNamesProducts()
    resetAutocomplete()
    autocompleteRegistrarVenta('inputRegistrarVenta', nameProducts)
}

const recuperarInputsProduct = () => {

    /* Validar Inputs */
    if (inputCreateNameProduct.value == '') {
        return
    }
    if (inputCreatePrecioProduct.value == '') {
        return
    }

    /* Recuperar producto */
    productos.push({
        id: Date.now(),
        name: inputCreateNameProduct.value,
        precio: parseFloat(inputCreatePrecioProduct.value),
    })

}

const resetInputProducts = () => {
    inputCreateNameProduct.value = ''
    inputCreatePrecioProduct.value = ''
}

const actualizarLocalStorach = (name, arreglo) => {
    localStorage.setItem(name, JSON.stringify(arreglo))
}

const sincronizarConStorachProducts = () => {
    productos = localStorage.getItem('Productos') || []
    if (!productos.length > 0) {
        return
    }
    productos = JSON.parse(productos)
}

const inyectarProductos = () => {

    const conteinerItemsProductos = document.querySelector('#conteinerItemsProductos')

    conteinerItemsProductos.innerHTML = ''

    productos.forEach(producto => {
        const name = producto.name
        const precio = producto.precio

        const conteinerName = document.createElement('p')
        const conteinerPrecio = document.createElement('p')
        const conteinerItem = document.createElement('div')

        conteinerName.textContent = name
        conteinerPrecio.textContent = `$${precio}`

        conteinerItem.appendChild(conteinerName)
        conteinerItem.appendChild(conteinerPrecio)

        conteinerItem.classList.add('item')

        conteinerItemsProductos.insertAdjacentElement('afterbegin', conteinerItem)

        conteinerItem.ondblclick = () => {
            deleteItem(producto.id)
        }
    })
}

const deleteItem = id => {
    productos = productos.filter(producto => producto.id !== id)
    actualizarLocalStorach('Productos', productos)
    inyectarProductos()
}


/* Crear Gastos */
const createGasto = e => {
    e.preventDefault()

    recuperarInputsGastos()

    resetInputsGastos()

    actualizarLocalStorach('Gastos', gastos)

    sincronizarConStorachGastos()

    inyectarGastos()

    actualizarTotalDeGastos()
}

const recuperarInputsGastos = () => {
    if (inputCreateNameGasto.value == '') {
        return
    }
    if (inputCreatePrecioGasto.value == '') {
        return
    }

    gastos.push({
        id: Date.now(),
        name: inputCreateNameGasto.value,
        precio: inputCreatePrecioGasto.value,
    })
}

const resetInputsGastos = () => {
    inputCreateNameGasto.value = ''
    inputCreatePrecioGasto.value = ''
}

const sincronizarConStorachGastos = () => {
    gastos = localStorage.getItem('Gastos') || []
    if (!gastos.length > 0) {
        return
    }
    gastos = JSON.parse(gastos)
}

const inyectarGastos = () => {
    const conteinerItemsGastos = document.querySelector('#conteinerItemsGastos')

    conteinerItemsGastos.innerHTML = ''

    gastos.forEach(gasto => {
        const name = gasto.name
        const precio = gasto.precio

        const conteinerName = document.createElement('p')
        const conteinerPrecio = document.createElement('p')
        const conteinerItem = document.createElement('div')

        conteinerName.textContent = name
        conteinerPrecio.textContent = `$${precio}`

        conteinerItem.appendChild(conteinerName)
        conteinerItem.appendChild(conteinerPrecio)

        conteinerItem.classList.add('item')

        conteinerItemsGastos.insertAdjacentElement('afterbegin', conteinerItem)

        conteinerItem.ondblclick = () => {
            deleteItemGasto(gasto.id)
        }
    })
}

const deleteItemGasto = id => {
    gastos = gastos.filter(gasto => gasto.id !== id)
    actualizarLocalStorach('Gastos', gastos)
    inyectarGastos()
    actualizarTotalDeGastos()
}

const actualizarTotalDeGastos = () => {
    const itemTotalGastos = document.querySelector('#itemTotalGastos')
    totalGastos = 0
    gastos.forEach(gasto => {
        totalGastos += parseFloat(gasto.precio)
    })

    itemTotalGastos.innerHTML = `$${totalGastos}`
}



/* AutoComplete Registrar Venta */

const recuperarNamesProducts = () => {
    nameProducts = productos.map(producto => {
        return producto.name
    })
}

function autocompleteRegistrarVenta(inputId, dataArray) {

    // Obtener la referencia al input
    const input = document.getElementById(inputId);

    // Crear el elemento que contendrá la lista de opciones
    const lista = document.createElement("ul");
    lista.setAttribute("id", `${inputId}-autocomplete-list`);

    // Agregar la lista después del input
    input.parentNode.insertBefore(lista, input.nextSibling);

    // Función para crear las opciones de la lista
    function crearOpcion(texto) {
        const opcion = document.createElement("li");
        opcion.innerHTML = texto;
        lista.appendChild(opcion);
        opcion.addEventListener("click", () => {
            input.value = texto;
            lista.innerHTML = "";
        });
    }

    // Función que maneja el evento "input" del input
    function autocompletar() {
        const valor = input.value.toLowerCase();
        lista.innerHTML = "";
        if (valor.length < 1) {
            return;
        }
        const opciones = dataArray.filter(
            item => item.toLowerCase().startsWith(valor)
        );
        opciones.forEach(opcion => crearOpcion(opcion));
    }


    // Agregar el evento "input" al input
    input.addEventListener("input", autocompletar);


    // Agregar el estilo CSS para resaltar la opción seleccionada
    const estilo = document.createElement("style");
    estilo.innerHTML = `
      li.seleccionada {
        background-color: #ddd;
      }
    `;
}

const resetAutocomplete = () => {
    const autocompleteList = document.querySelector('#inputRegistrarVenta-autocomplete-list')
    autocompleteList.remove()
}

const recuperarPrecioProduct = () => {
    /* Recuperar Datos */
    const name = inputRegistrarVenta.value
    const precioProduct = document.querySelector('#precioProduct')

    /* Buscar Producto */
    cotizacion = productos.filter(producto => producto.name == name)[0]

    /* Validacion */
    if (cotizacion == undefined) {
        precioProduct.textContent = 'Total: $0'
        return
    }
    
    /* Imprimir HTML*/
    precioProduct.textContent = `Total: $${cotizacion.precio * inputCantidad.value}`

}

const recuperarPrecioProductChange = () => {
    setTimeout(() => {
        /* Recuperar Datos */
        const name = inputRegistrarVenta.value
        const precioProduct = document.querySelector('#precioProduct')

        /* Buscar producto */
        cotizacion = productos.filter(producto => producto.name == name)[0]

        /* Validacion */
        if (cotizacion == undefined) {
            precioProduct.textContent = 'Total: $0'
            return
        }

        /* Imprimir HTML */
        precioProduct.textContent = `Total: $${cotizacion.precio * inputCantidad.value}`
    }, 300)


}

const aumentarCantidad = () => {
    inputCantidad.value++
    recuperarPrecioProduct()
}

const resetCantidad = () => {
    inputCantidad.value = 1
}



/* Registrar Venta */
const registrarVenta = e => {
    e.preventDefault()

    recuperarVenta()

    inyectarVenta()

    actualizarTotalVentasDelmomento()
}

const recuperarVenta = () => {
    /* Validacion */
    if(inputRegistrarVenta.value == ''){
        return
    }

    /* Sacar Copia del producto */
    cotizacion = JSON.parse(JSON.stringify(cotizacion))
    cotizacion.id = Date.now()
    cotizacion.precio = cotizacion.precio * inputCantidad.value

    /* Registrar Venta */
    ventasDelMomento.push(cotizacion)

    /* Limpiar Inputs */
    inputRegistrarVenta.value = ''
    resetCantidad()
    precioProduct.textContent = 'Total: 0'
}

const inyectarVenta = () => {
    const conteinerVentasDelMomento = document.querySelector('#conteinerVentasDelMomento')
    conteinerVentasDelMomento.innerHTML = ''

    ventasDelMomento.forEach(venta => {
        const name = venta.name
        const precio = venta.precio

        const conteinerName = document.createElement('p')
        const conteinerPrecio = document.createElement('p')
        const conteinerItem = document.createElement('div')

        conteinerName.textContent = name
        conteinerPrecio.textContent = `$${precio}`

        conteinerItem.appendChild(conteinerName)
        conteinerItem.appendChild(conteinerPrecio)

        conteinerItem.classList.add('item')

        conteinerVentasDelMomento.insertAdjacentElement('afterbegin', conteinerItem)

        conteinerItem.ondblclick = () => {
            deleteVentaMoment(venta.id)
        }
    })

}

const deleteVentaMoment = id => {
    ventasDelMomento = ventasDelMomento.filter(venta => venta.id !== id)
    inyectarVenta()
    actualizarTotalVentasDelmomento()
}

const actualizarTotalVentasDelmomento = () => {
    const itemTotalVentasMomento = document.querySelector('#itemTotalVentasMomento')

    totalDelmomento = 0
    ventasDelMomento.forEach( venta => {
        totalDelmomento += venta.precio
    })

    itemTotalVentasMomento.textContent = `$${totalDelmomento}`
}




/* Cargar Ventas */

const cargarVentasDiarias = e => {
    e.preventDefault()

    recuperarVentasDelMomento()
    
    limpiarVentasMoment()

    actualizarLocalStorach('Ventas del Dia', ventasDelDia)

    sincronizarConLocalStorachVentasDelDia()

    inyectarVentasDelDia()

    actualizarTotalVentasDia()
}

const limpiarVentasMoment = () => {
    conteinerVentasDelMomento.innerHTML = ''
    ventasDelMomento = []
    actualizarTotalVentasDelmomento()
}

const recuperarVentasDelMomento = () => {
    ventasDelMomento.forEach( ventaMoment => {

        existencia = ventasDelDia.find( venta =>  venta.name == ventaMoment.name)

        console.log(existencia)
        
        if(existencia == undefined){
            ventasDelDia.push(ventaMoment)
        }else{
            ventasDelDia.forEach( ventaD => {
                if(ventaD.name == ventaMoment.name){
                    ventaD.precio += ventaMoment.precio
                }
            })
        }

    }) 

    console.log(ventasDelDia)
}

const sincronizarConLocalStorachVentasDelDia = () => {
    ventasDelDia = localStorage.getItem('Ventas del Dia') || []
    if (!ventasDelDia.length > 0) {
        return
    }
    ventasDelDia = JSON.parse(ventasDelDia)
}

const inyectarVentasDelDia = () => {

    const conteinerVentasDelDia = document.querySelector('#conteinerVentasDelDia')
    conteinerVentasDelDia.innerHTML = ''


    ventasDelDia.forEach(ventas => {
        const name = ventas.name
        const precio = ventas.precio

        const conteinerName = document.createElement('p')
        const conteinerPrecio = document.createElement('p')
        const conteinerItem = document.createElement('div')

        conteinerName.textContent = name
        conteinerPrecio.textContent = `$${precio}`

        conteinerItem.appendChild(conteinerName)
        conteinerItem.appendChild(conteinerPrecio)

        conteinerItem.classList.add('item')

        conteinerVentasDelDia.insertAdjacentElement('afterbegin', conteinerItem)
    })
}

const actualizarTotalVentasDia = () => {
    const itemTotalVentasDia = document.querySelector('#itemTotalVentasDia')
    totalVentasDia = 0

    ventasDelDia.forEach( venta => {
        totalVentasDia += venta.precio
    })
    
    itemTotalVentasDia.textContent = `$${totalVentasDia}`
}





/* Resumen del dia */
const cargarResumenDelDia = e => {
    e.preventDefault()

    mostrarVentanaResumenDia()

    inyectarResumenDelDia()

}

const mostrarVentanaResumenDia = () => {
    ocultarVentanas()
    ventanaResumenVenta.classList.add('ventanaFlotante--active')
}

const inyectarResumenDelDia = () => {
    
    const conteinerResumen = document.querySelector('#conteinerResumen')

    conteinerResumen.innerHTML = ''

    const date = document.createElement('p')
    const ventas = document.createElement('p')
    const gastos = document.createElement('p')
    const corte = document.createElement('p')

    date.textContent = obtenerFechaActual()
    ventas.textContent = `Total de Ventas: $${totalVentasDia}`
    gastos.textContent = `Total de Gastos: $${totalGastos}`
    corte.textContent = `Corte Final: $${totalVentasDia - totalGastos}`

    conteinerResumen.appendChild(corte)
    conteinerResumen.appendChild(gastos)
    conteinerResumen.appendChild(ventas)
    conteinerResumen.appendChild(date)

}

function obtenerFechaActual() {
    // Crear un objeto de fecha
    var fechaActual = new Date();

    // Días de la semana en español
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var diaSemana = diasSemana[fechaActual.getDay()];

    // Obtener el día, mes y año
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se agrega 1
    var año = fechaActual.getFullYear();

    // Meses en español
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    var nombreMes = meses[mes - 1]; // Restamos 1 para obtener el mes correcto del array

    // Construir la fecha completa
    var fechaCompleta = diaSemana + ', ' + dia + ' de ' + nombreMes + ' de ' + año;

    // Devolver la fecha completa
    return fechaCompleta;
}





/* Guardar Corte */
const saveCorte = e => {
    e.preventDefault()

    ocultarVentanas()

    mostrarVentanaCortes()

    estructurarCorte()

    actualizarLocalStorach('Cortes', cortes)

    sincronizarConStorachCortes()
    
    inyectarCortes()

    resetDay()

}

const estructurarCorte = () => {
    cortes.push( {
        fecha: new Date(),
        fechaEs: obtenerFechaActual(),
        totalVentas: totalVentasDia,
        totalGastos: totalGastos,
        corte: totalVentasDia - totalGastos,

        ventas: ventasDelDia,
        gastos: gastos,
    })

    /* cortes.push(corte) */
}

const sincronizarConStorachCortes = () => {
    cortes = localStorage.getItem('Cortes') || []
    if (!cortes.length > 0) {
        return
    }
    cortes = JSON.parse(cortes)
}

const resetDay = () => {
    localStorage.removeItem('Gastos')
    localStorage.removeItem('Ventas del Dia')

    totalGastos = 0
    totalVentasDia = 0

    gastos = []
    ventasDelDia = []

    inyectarVentasDelDia()
    actualizarTotalVentasDia()
    inyectarGastos()
    actualizarTotalDeGastos()

}

const inyectarCortes = () => {
    const conteinerCortes = document.querySelector('#conteinerCortes')
    conteinerCortes.innerHTML = ''

    cortes.forEach( corte => {
        const date = document.createElement('p')
        const ventas = document.createElement('p')
        const gastos = document.createElement('p')
        const corteFinal = document.createElement('p')
        const conteinerCorte = document.createElement('div')

        date.textContent = corte.fechaEs
        ventas.textContent = `Total de Ventas: $${corte.totalVentas}`
        gastos.textContent = `Total de Gastos: $${corte.totalGastos}`
        corteFinal.textContent = `Corte Final: $${corte.corte}`

        conteinerCorte.appendChild(date)
        conteinerCorte.appendChild(ventas)
        conteinerCorte.appendChild(gastos)
        conteinerCorte.appendChild(corteFinal)

        conteinerCorte.classList.add('cortes')

        conteinerCortes.insertAdjacentElement('afterbegin', conteinerCorte)


        /* Agregamos el evento para recapitular información */
        conteinerCorte.onclick = () =>{
            recapitularInformacion(corte.fecha)
        }
        
    })
}


/* Recapitular Información */
const recapitularInformacion = id => {
    /* Recuperar los datos */
    peticion = cortes.filter( corte => corte.fecha == id)[0]
    console.log(peticion)

    /* Mostrar Ventana */
    ocultarVentanas()
    ventanaRecapitulacion.classList.add('ventanaFlotante--active')

    /* Cargar Datos Resumen Principal*/
    const recapitulacionResumen = document.querySelector('#recapitulacionResumen')
    recapitulacionResumen.innerHTML = ''

    const fecha = document.createElement('p')
    fecha.classList.add('recapitulacionTitle')
    const ventas = document.createElement('p')
    const gastos = document.createElement('p')
    const cortefinal = document.createElement('p')

    fecha.textContent = peticion.fechaEs
    ventas.textContent = `Total de Ventas: $${peticion.totalVentas}`
    gastos.textContent = `Total de Gastos: $${peticion.totalGastos}`
    cortefinal.textContent = `Corte Final: $${peticion.corte}`

    recapitulacionResumen.appendChild(fecha)
    recapitulacionResumen.appendChild(ventas)
    recapitulacionResumen.appendChild(gastos)
    recapitulacionResumen.appendChild(cortefinal)


    /* Cargar Ventas */
    const recapitulacionVentas = document.querySelector('#recapitulacionVentas')
    recapitulacionVentas.innerHTML = ''
    const arregloVentas = peticion.ventas
    console.log(arregloVentas)

    arregloVentas.forEach( venta => {
        const name = venta.name
        const precio = venta.precio

        const conteinerName = document.createElement('p')
        const conteinerPrecio = document.createElement('p')
        const conteinerItem = document.createElement('div')

        conteinerName.textContent = name
        conteinerPrecio.textContent = `$${precio}`

        conteinerItem.appendChild(conteinerName)
        conteinerItem.appendChild(conteinerPrecio)

        conteinerItem.classList.add('item')

        recapitulacionVentas.insertAdjacentElement('afterbegin', conteinerItem)
    })


    /* Cargar Gastos */
    const recapitulacionGastos = document.querySelector('#recapitulacionGastos')
    recapitulacionGastos.innerHTML = ''

    const arregloGastos = peticion.gastos
    console.log(arregloGastos)

    arregloGastos.forEach( gasto => {
        const name = gasto.name
        const precio = gasto.precio

        const conteinerName = document.createElement('p')
        const conteinerPrecio = document.createElement('p')
        const conteinerItem = document.createElement('div')

        conteinerName.textContent = name
        conteinerPrecio.textContent = `$${precio}`

        conteinerItem.appendChild(conteinerName)
        conteinerItem.appendChild(conteinerPrecio)

        conteinerItem.classList.add('item')

        recapitulacionGastos.insertAdjacentElement('afterbegin', conteinerItem)
    })
}
























/* Eventos ------------------------------------------------------------------------ */
/* Cargar Principal */
document.addEventListener('DOMContentLoaded', () => {

    sincronizarConStorachProducts()
    inyectarProductos()

    sincronizarConStorachGastos()
    inyectarGastos()
    actualizarTotalDeGastos()

    recuperarNamesProducts()
    autocompleteRegistrarVenta('inputRegistrarVenta', nameProducts)

    sincronizarConLocalStorachVentasDelDia()
    inyectarVentasDelDia()
    actualizarTotalVentasDia()

    sincronizarConStorachCortes()
    inyectarCortes()
})


/* BOTONES */
btnCreateProduct.addEventListener('click', createProduct)
btnCreateGasto.addEventListener('click', createGasto)
btnAumentarCantidad.addEventListener('click', aumentarCantidad)
btnRegistrarVenta.addEventListener('click', registrarVenta)
btnCargarVentasDiarias.addEventListener('click', cargarVentasDiarias)
btnVentanaResumenDelDia.addEventListener('click', cargarResumenDelDia)
btnSaveCorte.addEventListener('click', saveCorte)
btnSalirRecapitulacion.addEventListener('click', () => {
    ocultarVentanas()
    mostrarVentanaCortes()
})
/* INPUTS */
inputRegistrarVenta.addEventListener('input', () => {
    recuperarPrecioProduct()
    resetCantidad()
})
inputRegistrarVenta.addEventListener('change', recuperarPrecioProductChange)
inputCantidad.addEventListener('input', recuperarPrecioProduct)
