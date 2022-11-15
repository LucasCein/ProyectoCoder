
let prodSeleccionados = []
let container = document.getElementById('carrito-contenedor')
container.innerHTML = ""
let productos1 = []
let buttondelcarrito = []
let precioTotal = 0
let carrito = []
let botoneliminar
const cargaprods = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5500/assets/bdd.json')
        if (!response.ok) {
            throw new Error('HTTP error! status:' + response.status)
        }

        const data = await response.json()
        const { productos } = data
        productos1 = productos
        await agregarProductos()
    } catch (error) {
        console.log('error')
    }
}
//Agregar productos apenas carga la pagina
let agregarProductos = async () => {
    let prod = document.getElementById('productos')
    productos1.forEach((elemento) => {
        if (elemento !== null) {
            prod.innerHTML += `<div class="detalleprod" id="cards">
            <img src="${elemento.picture}" alt="${elemento.Title}">
            <p>${elemento.Title}</p>
            <p class="precio">$${elemento.price}</p>
            <span class="material-symbols-outlined carrito" id="${elemento._id}">
                add_shopping_cart
            </span>
            </div>`
        }


    })
    prod.innerHTML += `<section class="wpp">
    <a href="https://wa.me/543875145361?text=Hola%20,estoy%20interesado%20en%20sus%20productos" class="whatsapp" target="_blank"> <i class="fa fa-whatsapp whatsapp-icon"></i></a>
    </section>`
}
//agregar productos al carrito

let agregarAlCarrito = (aux) => {
    console.log('aux:' + aux)
    if (aux.length >= 1) {
        aux.forEach(element => {
            if (existenciaproducto(element)) {
                const div = document.createElement('div')
                div.className = ('productoEnCarrito')
                div.id = ('prodCarrito')
                div.innerHTML = `
                <p>${element.Title}</p>
                <p>Precio: $${element.price}</p>
                <p>Cantidad: <span id="cantidad">${element.cantidad}</span></p>
                <button class="boton-eliminar" onclick="eliminarItem('${element._id}')" id="${element._id}"><i class="fas fa-trash-alt"></i></button>
                `
                container.appendChild(div)
                // precioTotal += parseInt(element.price)
                precioFinal()
                carrito.push(element)
                console.log('carrito al ag:'+carrito)
                botoneliminar = document.querySelectorAll(".boton-eliminar")
                Toastify({
                    text: "Se ha agregado al carrito!",
                    duration: 1000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "black",
                    },
                    onClick: function () { }
                }).showToast();
            }
            else {
                Toastify({
                    text: "El producto ya se encuentra en el carrito!",
                    duration: 1000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "black",
                    },
                    onClick: function () { }
                }).showToast();
            }

        })

    }


}
let existenciaproducto = (prod) => {
    console.log('existencia:'+carrito)
    let existente = carrito.find(element => prod._id == element._id)
    console.log(existente)
    return existente == undefined ? true : false



}
//encontrar curso seleccionado para agregarlo al carrito
let buscarCurso = (id) => {
    let selec = []
    let prodSelec = productos1.find(element => id == element._id)
    selec.push(prodSelec)
    prodSeleccionados.push(prodSelec)
    if (prodSelec.length > 1) {
        let arrayfinal = [...prodSeleccionados, ...selec]
        console.log('arrayfinal:'+arrayfinal)
        agregarAlCarrito(arrayfinal)
    }
    else {
        agregarAlCarrito(selec)
    }


    sincronizarConLS()

}



let eliminarItem = (id) => {
    
    let elim = []
    if (carrito.length > 1) {
        elim = carrito.filter(element=> element._id !== id)
    }
    else {
        elim = []

        precioTotal = 0
    }
    carrito = elim
    prodSeleccionados = elim
    container.innerHTML = ""
    console.log('elim '+elim)
    console.log('carrito:'+carrito)
    agregarElims(carrito)
    
    sincronizarConLS()
    precioFinal()

}
let agregarElims = (aux) => {
   

    aux.forEach(element => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.id = ('prodCarrito')
        div.innerHTML = `
                <p>${element.Title}</p>
                <p>Precio:$ ${element.price}</p>
                <p>Cantidad: <span id="cantidad">${element.cantidad}</span></p>
                <button class="boton-eliminar" onclick="eliminarItem('${element._id}')" id="${element._id}"><i class="fas fa-trash-alt"></i></button>
                `
        container.appendChild(div)
        // precioTotal += parseInt(element.price)
        
        carrito.push(element)
    })
    precioFinal()

}
let precioFinal = () => {
    precioTotal = 0
    prodSeleccionados.forEach(element => {
        precioTotal += parseInt(element.price)
        console.log(element.price, element.Title)
    })
    let newtext = document.createTextNode(`${precioTotal}`);
    let spanPrecioFinal = document.getElementById("precioTotal");
    spanPrecioFinal.innerHTML = ""
    spanPrecioFinal.appendChild(newtext);

}

let sincronizarConLS = () => {
    localStorage.setItem("productos", JSON.stringify(prodSeleccionados))
}
//main
document.addEventListener("DOMContentLoaded", async () => {
    carrito=[]
    await cargaprods()
    prodSeleccionados = JSON.parse(localStorage.getItem("productos")) || []

    agregarAlCarrito(prodSeleccionados)
    botoneliminar = document.querySelectorAll(".boton-eliminar")
    let buttoncard = document.querySelectorAll('.carrito')
    buttoncard.forEach(element => {
        element.addEventListener("click", (event) => {
            event.preventDefault()
            let id = event.target.id
            buscarCurso(id)


        })
    })

    // botoneliminar.forEach(element => {
    //     element.addEventListener("click", (event) => {
    //         event.preventDefault()
    //         let id1 = event.target.id
    //         console.log(id1)
    //         eliminarItem(id1)
    //         console.log('click')
    //         console.log(carrito)
    //     })
    // })
    



})

