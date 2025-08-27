const grid = document.getElementById("grid");
const selectGenero = document.getElementById("genre");
const selectOrden = document.getElementById("sort");

class Pelicula {
  constructor(title, release_date, vote_average, poster_path) {
    this.titulo = title;
    this.anio = release_date ? release_date.substring(0,4) : "—";
    this.puntuacion = vote_average;
    this.poster = "https://image.tmdb.org/t/p/w500" + poster_path 
  }
}



document.addEventListener("DOMContentLoaded", ()=>{
    cargarPeliculasPopulares();
    selectGenero.addEventListener("change",cargarPeliculas);
    selectOrden.addEventListener("change",cargarPeliculas);

});

function cargarPeliculasPopulares(){
  
    const url="https://api.themoviedb.org/3/movie/popular?api_key=c2260838ab7a0b1f81b504de597aba9b&language=es-ES&page=1";

    fetch(url)
        .then(respuesta=>respuesta.json()) //Convertimos a objeto JSON la respuesta que nos da
        .then(datos => {
          const peliculas = pasarDatosAPeliculas(datos);
          console.log(peliculas);
          const peliculasSeleccionadas = peliculas.slice(0,18);
          insertarPeliculas(peliculasSeleccionadas)
        })
}

function cargarPeliculas(){
  const generoSeleccionado = document.querySelector("#genre").value;
  const ordenSeleccionado = document.querySelector("#sort").value;
  const url= `https://api.themoviedb.org/3/discover/movie?with_genres=${generoSeleccionado}&language=es-ES&sort_by=${ordenSeleccionado}&page=1&api_key=c2260838ab7a0b1f81b504de597aba9b&language=es-ES&page=1`;

    fetch(url)
      .then(respuesta=>respuesta.json()) //Convertimos a objeto JSON la respuesta que nos da
      .then(datos => {
        const peliculas = pasarDatosAPeliculas(datos);
        console.log(peliculas);
        const peliculasSeleccionadas = peliculas.slice(0,18);
        insertarPeliculas(peliculasSeleccionadas)
      })
}

function pasarDatosAPeliculas(datos){
  return datos.results.map(p =>
    new Pelicula(p.title, p.release_date, p.vote_average, p.poster_path)
    );
}

function insertarPeliculas(peliculas){
  grid.innerHTML = "";
  peliculas.forEach(p => {
    const li = document.createElement("li");
    li.classList.add("card");
    const portada = document.createElement("img");
    portada.src = p.poster;
    portada.alt = `Póster de ${p.titulo}`;
    const div = document.createElement("div");
    div.classList.add("card__meta");
    const h3 = document.createElement("h3");
    h3.textContent= p.titulo;
    const info = document.createElement("p");
    info.innerHTML=`${p.anio} · ★ ${p.puntuacion}`;
    div.appendChild(h3);
    div.appendChild(info);
    li.appendChild(portada);
    li.appendChild(div);
    grid.appendChild(li);
  });
}