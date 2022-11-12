
let prodSeleccionados = []
let container = document.getElementById('carrito-contenedor')
container.innerHTML = ""
let productos1=[]
let buttondelcarrito = []
let precioTotal = 0
const cargaprods= async()=>{
    try{
        const response=await fetch('http://127.0.0.1:5500/assets/bdd.json')
        if(!response.ok){
            throw new Error('HTTP error! status:'+response.status)
        }

        const data=await response.json()
        const {productos}=data
        productos1=productos
        console.log(productos1)
        agregarProductos()
    } catch(error){
        console.log('error')
    }
}
//Agregar productos apenas carga la pagina
let agregarProductos = () => {
    let prod = document.getElementById('productos')
    productos1.forEach((elemento) => {
        if(elemento!==null){
            prod.innerHTML += `<div class="detalleprod" id="cards">
            <img src="${elemento.picture}" alt="${elemento.Title}">
            <p>${elemento.Title}</p>
            <p class="precio">${elemento.price}</p>
            <section class="productIcons">
            <span class="material-symbols-outlined carrito" id="${elemento._id}">
                add_shopping_cart
            </span>
            <span class="material-symbols-outlined fav" id="${elemento._id}">favorite
            </span>
            </section>
            </div>`
        }
        

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
    let prodSelec = productos1.find(element => id == element._id)
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
    cargaprods()
    prodSeleccionados = JSON.parse(localStorage.getItem("productos")) || []
    agregarAlCarrito(prodSeleccionados)
    agregarProductos()
    let buttoncard = document.querySelectorAll("#cards .carrito")
    buttoncard.forEach(element => {
        element.addEventListener("click", (event) => {
            event.preventDefault()
            let id = event.target.id
            buscarCurso(id)
            
        })
    })
    console.log(buttoncard)


})

