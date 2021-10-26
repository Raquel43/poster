export let posterCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const numeroPosters = document.querySelector('#num-posters');

export class PosterAPI {
  static getJSONPoster() {
    fetch("./data/poster.json")
      .then((result) => result.json())
      .then((data) => {
        let posterJSON = data.posters;
       // console.log(data.posters);
        PosterAPI.populateFilms(posterJSON.films);
        PosterAPI.populateSeries(posterJSON.series);

        //PosterAPI.populateStarsSerie(posterJSON.series);
      });
  }

  

  static populateFilms(listFilms) {
    //Inicialización del contenedor de films
    document.querySelector("#list-films").innerHTML = "";

    listFilms.forEach((oFilm) => {
     // console.log("info:" + oFilm.id + " " + oFilm.name);
      //console.log(oFilm.id);
      let card = `
      <div class="card mb-4 shadow-sm" style="width: 14rem;">
      <img src="./img/film/${oFilm.cover}" class="card-img-top" alt="">
      <div class="card-body">
          <h5 class="card-title">${oFilm.name}</h5>
          <p class="card-text"><span class="text-info">Duración</span>${
            oFilm.duration
          }</p>
          <p class="card-text"><span class="text-info">Director:</span>${
            oFilm.director
          }</p>
          <p class="card-text"><span class="text-info bold">Género:</span>${
            oFilm.genre
          }</p>
      </div>
      <div class="card-header">Stars</div>
      <ul class="list-group list-group-flush">
       ${this.populateStarsFilm(oFilm.stars)}
      </ul>
      <!-- Button trigger modal -->
      <a data-id="nF${oFilm.id}"></a>
      <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nF${
        oFilm.id
      }">
        Comprar
      </button>
      
      <!-- Modal -->
      <div class="modal fade" id="nF${
        oFilm.id
      }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Poster ${
                oFilm.name
              }</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form>
            <p><label>Tamaño:</label>  <select name="" id="mida">
            <option value="min">Pequeño</option>
            <option value="med">Mediano</option>
            <option value="gran">Grande</option>
           </select></p>
            <p><label>Cantidad:</label><input id="cantidad" type="number" value="0" min="1"></p>
            <p><label>Precio:</label><input id="precio" type="number" data-value="${
              oFilm.price
            }" value="${oFilm.price}" readonly></p>
            
            
            </form> 
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" id="agregar-carrito" class="btn btn-primary"  data-bs-dismiss="modal">Realizar Pedido</button>
            </div>
          </div>
        </div>
      </div>
     
      </div>
  
            
            `;
      document.querySelector("#list-films").innerHTML += card;
    });
  }

  static populateStarsFilm(stars) {
   // console.log(stars);
    let contenido="";
    stars.forEach(star=>{
     // console.log(star);
      contenido += `
      <li class="card-text"><span class="text-info">Personaje: </span>${star.character}</li>
        <li class="card-text"><span class="text-info">Actor: </span>${star.name}</li>
      `;
    })
    //console.log(contenido);
   /*  let estrellas = [];
    let contenido;
    for (let i = 0; i < films.length; i++) {
      let temporal = { id: films[i].id, stars: films[i].stars };
      console.log(films[i].stars);
      estrellas.push(temporal);
    }
    console.log(estrellas);
    console.log(id);
    let estrellitas = estrellas.find((el) => console.log("el id", id));
    console.log("estrellitas", estrellitas);
    estrellitas.stars.forEach((estrella) => {
      console.log("Esto es una estrella", estrella);
      contenido += `
        <li class="card-text"><span class="text-info">Personaje: </span>${estrella.character}</li>
          <li class="card-text"><span class="text-info">Actor: </span>${estrella.name}</li>
        `;
      console.log(contenido);
    });
    return contenido; */
    return contenido;
  }

  static populateStarsSerie(stars) {
    console.log(stars);
    let contenido="";
    stars.forEach(star=>{
      console.log(star);
      contenido += `
      <li class="card-text"><span class="text-info">Personaje: </span>${star.character}</li>
        <li class="card-text"><span class="text-info">Actor: </span>${star.name}</li>
      `;
    })
    console.log(contenido);
    return contenido;
  }

  static populateSeries(listSeries) {
    document.querySelector("#list-Series").innerHTML = "";

    listSeries.forEach((oSerie) => {
     // console.log("info:" + oSerie.id + " " + oSerie.name);
      let card = `
      <div class="card mb-4" style="width: 14rem;">
      <img src="./img/serie/${oSerie.cover}" class="card-img-top" alt="">
      <div class="card-body">
          <h5 class="card-title">${oSerie.name}</h5>
          <p class="card-text"><span class="text-info">Duración</span>${oSerie.duration}</p>
          <p class="card-text"><span class="text-info">Director:</span>${oSerie.director}</p>
          <p class="card-text"><span class="text-info bold">Género:</span>${oSerie.genre}</p>
      </div>
      <div class="card-header">Stars</div>
      <ul class="list-group list-group-flush">
      ${this.populateStarsFilm(oSerie.stars)}
      </ul>
      <!-- Button trigger modal -->
      <a data-id="nS${oSerie.id}"></a>
      <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nS${oSerie.id}">
        Comprar
      </button>
      
      <!-- Modal -->
      <div class="modal fade" id="nS${oSerie.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Poster ${oSerie.name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form>
            <p><label>Tamaño:</label>  <select name="" id="mida">
            <option value="min">Pequeño</option>
            <option value="med">Mediano</option>
            <option value="gran">Grande</option>
           </select></p>
          
            <p><label>Cantidad:</label><input id="cantidad" type="number" value="0" min="1"></p>
            <p><label>Precio:</label><input id="precio" type="number" data-value="${oSerie.price}" value="${oSerie.price}" readonly></p>
            
            
            </form> 
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" id="agregar-carrito" class="btn btn-primary" data-bs-dismiss="modal" >Realizar Pedido</button>
            </div>
          </div>
        </div>
      </div>
     
      </div>
  
        
            
            `;
      document.querySelector("#list-Series").innerHTML += card;
    });
  }

  

  
  static calcularSubtotal(cantidad, precio, mida) {
    if(mida == "min"){
      precio = precio;
    }
    else if(mida == "med"){
      precio = precio*1.10;
    }
    else if(mida == "gran"){
      precio = precio*1.20;
    }
    let subtotal = cantidad * precio;
    
    return subtotal;
  }

  //Captura los eventos del html
  static eventsBody(e) {
    let dom = e.target;
   
    console.log(dom);

    if (dom.id == "cantidad" || dom.id == "mida") {
      let cantidad = dom.value;
      let precio = dom.parentNode.parentNode.querySelector("#precio");
      let mida = dom.parentNode.parentNode.querySelector("#mida");
      
      //dataset hace referencia al data-value del modal
      precio.value = PosterAPI.calcularSubtotal(cantidad, precio.dataset.value, mida.value).toFixed(2);
      console.log(mida.value);

     
    }
    
  }

  static eventsModal(e) {
    let dom = e.target;
    let poster;

    console.log("estoy dentro");
    if (dom.id == "agregar-carrito") {
      //Llegamos al elemento "card"
      poster =
        dom.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      console.log("Estoy Aqui", poster);
    } else {
      // Si no se le pone este else, no le da tiempo de leer los datos antes de cargarlos!
      // console.error("Error leyendo datos, no hay cursos");
      return false;
    }
    console.log(poster);
    let infoPoster = {
      medida : poster.querySelector("#mida").value,
      imagen: poster.querySelector("img").src,
      titulo: poster.querySelector("h5").textContent,
      cantidad: poster.querySelector("#cantidad").value,
      precioUnitario: poster.querySelector("#precio").dataset.value,
      precio: poster.querySelector("#precio").value,
      id: poster.querySelector("a").getAttribute("data-id"),
    };

    console.log(infoPoster);

    // Revisa si un elemento ya existe en el carrito
    const existe = posterCarrito.some((poster) => poster.id === infoPoster.id);
    if (existe) {
      // Si ya existe el curso en el carrito, sólo actualizamos la cantidad
      const posters = posterCarrito.map((poster) => {
        if (poster.id === infoPoster.id) {
          poster.cantidad++;
          return poster; // retorna el objeto actualizado
        } else {
          return poster; // retorna los objetos que no son los duplicados
        }
      });

      // La variable "posters" contiene un array de posters actualizados
      // Pasamos los posters al nuevo carrito
      posterCarrito = posters; //posterCarrito = [...cursos];
    } else {
      // Agrega el nuevo curso al array de carrito
      posterCarrito.push(infoPoster); //articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log("mi carrito", posterCarrito);
    PosterAPI.generarCarritoHTML();

    
  }

  /* Elimina un curso del carrito
   */
  static eliminarCurso(e) {
    if (e.target.classList.contains("fa-times-circle")) {
      const cursoId = e.target.getAttribute("data-id");

      // Elimina del arreglo de articulosCarrito por el data-id
      posterCarrito = posterCarrito.filter((curso) => curso.id !== cursoId);

      PosterAPI.generarCarritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
  }

  static generarCarritoHTML() {
    PosterAPI.limpiarHTML();

    let cantidadTotal = 0;
    let cantidadCurso = 0;
   // let precioDescuento = 0;
    let cantidadPrecio = 0;

    // Recorre el carrito y genera el HTML para cada item
    posterCarrito.forEach((poster) => {
       // Usamos destructuring
      let {medida, imagen, titulo, cantidad, precioUnitario, precio, id } = poster; 
      if(medida == "min"){
        precioUnitario = precioUnitario;
      }
      else if(medida == "med"){
        precioUnitario = (precioUnitario*1.10);
      }
      else if(medida == "gran"){
        precioUnitario = (precioUnitario*1.20);
      }
     
      if(cantidad>0){
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>
                  <img src="${imagen}" width="50">
              </td>
              <td>${titulo}</td>
              <td>${precioUnitario}€</td>
              <td>${cantidad}</td>
              <td>
                  <a href="#" class="borrar-curso"><i data-id="${id}" class="fas fa-times-circle"></i></a>
              </td>
          `;
   
      cantidadPrecio = (parseInt(precioUnitario) * parseInt(cantidad)).toFixed(2);
      cantidadTotal += parseInt(cantidadPrecio);
      console.log(cantidadTotal)

      // precioDescuento = parseInt(precio);
      //cantidadPrecio = precioDescuento*cantidad;
      cantidadCurso += parseInt(cantidad);
      // Agrega el HTML del carrito en el tbody
      contenedorCarrito.appendChild(row);
   
      }
  
  });
  

    // Pintar fila total
    if (cantidadTotal > 0) {
      const row = document.createElement("tr");
      /*template*/
      row.innerHTML = `
          <td colspan="3">Total</td>
          <td>${cantidadCurso}</td>
          <td>${cantidadTotal}€</td>
          <td></td>
      `;
      contenedorCarrito.appendChild(row);
      PosterAPI.mostrarAlert();
    }
   numeroPosters.innerHTML = `${cantidadCurso}`
    // Agregar el carrito de compras al storage
    localStorage.setItem("carrito", JSON.stringify(posterCarrito));
  
    //calcularNumeroCursos();
  }
  

  /**
   * Función aux. Elimina los cursos del tbody del carrito
   * */
  static limpiarHTML() {
    contenedorCarrito.innerHTML = "";
  }

  static limpiarJson(container) {
    container.innerHTML = " ";
  }

  static mostrarAlert() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Poster añadido al carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  static mostrarAlert2(palabra) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "No se encuentra "+ palabra,
      showConfirmButton: true,
     });
  }

  static mostrarAlert3(palabra) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "He encontrado "+ palabra ,
      showConfirmButton: false,
      timer: 3000,
    });
  }


  static clickPeliculas() {
    document.querySelector("#listaFilm").click();
  }

  static clickSeries() {
    document.querySelector("#listaSerie").click();
  }

  static IrAbajo() {
    document.querySelector("#irAbajo").click();
  }

  /* static presionar_tecla(){
    //www.keycode.info
    let tecla_intro = event.keyCode;
    if(tecla_intro == 13){
      PosterAPI.buscar();
    }
  } */

  static buscar() {
    PosterAPI.IrAbajo();
    fetch("./data/poster.json")
      .then((response) => response.json())
      .then((data) => {
        let textoABuscar = document.querySelector("#buscador").value;
        textoABuscar = textoABuscar.toLowerCase();
        let listFilms = data.posters.films;
        let listSeries = data.posters.series;
        let series = listSeries.filter(
          (item) => item.name.toLowerCase().indexOf(textoABuscar) > -1
        );
        let films = listFilms.filter(
          (item) => item.name.toLowerCase().indexOf(textoABuscar) > -1
        );

        if (films.length > 0) {
          PosterAPI.clickPeliculas();
          PosterAPI.populateFilms(films);
          this.mostrarAlert3(textoABuscar);
        } else {
          this.mostrarAlert2(textoABuscar);
        }

        if (series.length > 0) {
          PosterAPI.clickSeries();
          PosterAPI.populateSeries(series);
          this.mostrarAlert3(textoABuscar);
        } else {
         this.mostrarAlert2(textoABuscar);
        }
      });
  }
}
