const publicacionesData = [];
const formPublicar = document.getElementById("formPublicar");

const formFile = document.getElementById("formFile");
const preview = document.getElementById("preview");

formFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);  
    console.log(preview);
    
    preview.src = imageURL;
});

class Publicacion {
    constructor(titulo,descripcion, imgUrl, likes) {
        this.titulo = titulo,
        this.descripcion = descripcion,
        this.imgUrl = imgUrl,
        this.likes = likes
    }
    incrementarMegusta() {
        this.likes += 1;
        console.log("modificar tarjeta");
        
    }
}


formPublicar.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("nueva publi");

    const inputTitulo = document.getElementById("inputTitulo")
    const inputDescripcion = document.getElementById("inputDescripcion")
    const formFile = document.getElementById("formFile")
    const preview = document.getElementById("preview")
    console.dir(inputTitulo);
    console.log(preview.src);
    

    let nuevaPublicacionData = new Publicacion(
        inputTitulo.value,
        inputDescripcion.value,
        preview.src,
        0
    )
    publicacionesData.push(nuevaPublicacionData)
    
    mostrarPublicaciones(publicacionesData);

    //Borras datos form
    inputTitulo.value = ""
    inputDescripcion.value = ""
    preview.src = ""
})
function mostrarPublicaciones(data) {
    const newData = Array.from(data)
    const cardsFeed = document.querySelector(".cardsFeed");
    cardsFeed.innerHTML = ""
    console.log(newData);
    

    if (newData.length > 0) {
        console.log(typeof newData);
        
        newData.forEach(el => {
            let publicacion = crearPublicacion(el)
            cardsFeed.appendChild(publicacion)
        })
    }
}

function crearPublicacion(data) {
    console.log("creando card");
    
    // Crear contenedor principal
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";

    // Imagen
    const img = document.createElement("img");
    img.src = data.imgUrl;
    img.alt = data.titulo;
    img.className = "card-img-top";
    img.style.height = "9rem";
    img.style.border = "1px solid black";

    // Body
    const body = document.createElement("div");
    body.className = "card-body";

    // Título
    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = data.titulo;

    // Texto principal
    const pTexto = document.createElement("p");
    pTexto.className = "card-text";
    pTexto.textContent = data.descripcion;

    // Likes
    const pLikes = document.createElement("p");
    pLikes.className = "card-text";
    pLikes.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/>
    </svg>  
    <span class="likes-count">${data.likes}</span> Likes`;

    // Botón
    const boton = document.createElement("a");
    boton.href = "#";
    boton.className = "btn btn-primary";
    boton.textContent = "👍 Me gusta";
    boton.onclick =  (e) => {
        e.preventDefault();

        if(data.likes === 0) {
            pLikes.innerHTML =   `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/>
                </svg>  
                <span class="likes-count">${data.likes}</span> Likes`;

        }

        // 1. Actualizar el array (datos reales)
        data.likes++;

        // 2. Actualizar la vista (el elemento en pantalla)
        body.querySelector(".likes-count").textContent = data.likes;

        boton.className = "btn btn-danger";
    };

    // Armar estructura
    body.appendChild(h5);
    body.appendChild(pTexto);
    body.appendChild(pLikes);
    body.appendChild(boton);

    card.appendChild(img);
    card.appendChild(body);

    return card;
}

mostrarPublicaciones(publicacionesData);