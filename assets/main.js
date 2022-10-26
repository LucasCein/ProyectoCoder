let prodSeleccionados = []
let container = document.getElementById('carrito-contenedor')
container.innerHTML = ""
let buttondelcarrito = []
let precioTotal = 0
let productos = [
    {
        "_id": "635824538e0dc5da8f902a03",
        "price": "2824",
        "picture": "../images/productImg/E6437_1-min.jpg",
        "cantidad": "1",
        "Title": "Loyd Forro Polar Light Grey Melange"
    },
    {
        "_id": "63582453bc409c62ee01fb71",
        "price": "3654",
        "picture": "../images/productImg/F0785_01_F4Nb488-min.jpg",
        "cantidad": "1",
        "Title": "Pile Forro Polar Phantom"
    },
    {
        "_id": "63582453e7ba33c3e19115ac",
        "price": "1676",
        "picture": "../images/productImg/F0786_01_OAnW47E-min.jpg",
        "cantidad": "1",
        "Title": "Pile Forro Polar Olive Green"
    },
    {
        "_id": "63582453377428902479a090",
        "price": "2174",
        "picture": "../images/productImg/F0989_01_eqiXnC9-min.jpg",
        "cantidad": "1",
        "Title": "Cozy II Polar con Capucha Paint Orange"
    },
    {
        "_id": "63582453d72645b5a6e3b0ab",
        "price": "3860",
        "picture": "../images/productImg/F0989_01_eqiXnC9-min.jpg",
        "cantidad": "1",
        "Title": "Comfy Forro Polar Olive Green"
    },
    {
        "_id": "635824533214e22713e2e21c",
        "price": "2229",
        "picture": "../images/productImg/F0993_01_ttV5ufJ-min.jpg",
        "cantidad": "1",
        "Title": "Comfy Forro Polar Paint Orange"
    },
    {
        "_id": "635824536759df524bf87dfe",
        "price": "3499",
        "picture": "../images/productImg/F0994_01_yJALW2D-min.jpg",
        "cantidad": "1",
        "Title": "Comfy Forro Polar Paint Burgundy"
    },
    {
        "_id": "63582453fd162b0bc0f69b85",
        "price": "1072",
        "picture": "../images/productImg/F0996_01_IBidGwQ-min.jpg",
        "cantidad": "1",
        "Title": "Comfy Pantalones Polares Black"
    }
]
//Agregar productos apenas carga la pagina
let agregarProductos = () => {
    let prod = document.getElementById('productos')
    productos.forEach((elemento) => {
        prod.innerHTML += `<div class="detalleprod" id="cards">
        <img src="${elemento.picture}" alt="${elemento.Title}">
        <p>${elemento.Title}</p>
        <p class="precio">${elemento.price}</p>
        <span class="material-symbols-outlined" id="${elemento._id}">
            add_shopping_cart
        </span>
        </div>`

    })
    prod.innerHTML += `<section class="wpp">
    <a href="https://wa.me/543875145361?text=Hola%20,estoy%20interesado%20en%20sus%20productos" class="whatsapp" target="_blank"> <i class="fa fa-whatsapp whatsapp-icon"></i></a>
    </section>`
}
//agregar productos al carrito
//Si existe no se tiene que agregar de nuevo. Falta esto
let agregarAlCarrito = (aux) => {
    if (aux.length >= 1) {
        aux.forEach(element => {
            const div = document.createElement('div')
            div.className = ('productoEnCarrito')
            div.id = ('prodCarrito')
            div.innerHTML = `
            <p>${element.Title}</p>
            <p>Precio: ${element.price}</p>
            <p>Cantidad: <span id="cantidad">${element.cantidad}</span></p>
            <button class="boton-eliminar" onclick="eliminarItem('${element._id}')" id="${element._id}"><i class="fas fa-trash-alt"></i></button>
            `
            container.appendChild(div)
            // precioTotal += parseInt(element.price)
            precioFinal()
        })
    }


}
//encontrar curso seleccionado para agregarlo al carrito
let buscarCurso = (id) => {
    let selec = []
    let prodSelec = productos.find(element => id == element._id)
    selec.push(prodSelec)
    prodSeleccionados.push(prodSelec)
    if (prodSelec.length > 1) {
        let arrayfinal = [...prodSeleccionados, ...selec]
        agregarAlCarrito(arrayfinal)
    }
    else {
        agregarAlCarrito(selec)
    }

    
    sincronizarConLS()

}

let buscarEnCarrito = (id) => {
    let elim = []
    if (prodSeleccionados.length > 1) {
        elim = prodSeleccionados.filter(element => element._id != id)
        

    }
    else {
        elim = []
        precioTotal = 0
    }

    prodSeleccionados = elim
    container.innerHTML = ""
    agregarAlCarrito(elim)
    console.log(elim)
    sincronizarConLS()
    precioFinal()
}

let eliminarItem = (id) => {
    buscarEnCarrito(id)

}

let precioFinal = () => {
    precioTotal=0
    prodSeleccionados.forEach(element => {
        precioTotal+= parseInt(element.price)
        console.log(precioTotal)
    })
    let newtext = document.createTextNode(`${precioTotal}`);
    let spanPrecioFinal = document.getElementById("precioTotal");
    spanPrecioFinal.innerHTML=""
    spanPrecioFinal.appendChild(newtext);
    console.log(prodSeleccionados)
    
}

let sincronizarConLS = () => {
    localStorage.setItem("productos", JSON.stringify(prodSeleccionados))
}
//main
document.addEventListener("DOMContentLoaded", () => {
    prodSeleccionados = JSON.parse(localStorage.getItem("productos")) || []
    agregarAlCarrito(prodSeleccionados)
    agregarProductos()
    let buttoncard = document.querySelectorAll("#cards span")
    buttoncard.forEach(element => {
        element.addEventListener("click", (event) => {
            event.preventDefault()
            let id = event.target.id
            buscarCurso(id)

        })
    })


})

