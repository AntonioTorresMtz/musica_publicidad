document.addEventListener("DOMContentLoaded", (event) => {
  progreso = document
    .getElementById("progress")
    .addEventListener("click", adelantar);
});

const aleatorio = document.getElementById("aleatorio");
//Array con el listado de canciones a mostrar en el reprodutor
const canciones = [];

const audiosPublicidad = [];

var musicaAleatoria = [];
var cola = [];
var indicePlayListAleatoria = 0;
var indicePublicidad = 0;
let cincoSegundosNotificados = false;
let cincoSegundosInicio = false;

var indiceActual = new Array(1);
//Funcion para crear mediante javascript el listado de canciones
function crearPlayList() {
  const listado = document.createElement("ol");
  listado.setAttribute("id", "listadoMusica");
  for (let i = 0; i < canciones.length; i++) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(canciones[i]));
    item.setAttribute("id", canciones.indexOf(canciones[i]));
    listado.appendChild(item);
  }
  console.log("Se creo el listado");
  return listado;
}

//Funcion para cambiar el icono del reproductor
function classIconPlay() {
  var element = document.getElementById("iconPlay");
  element.classList.remove("fa-pause-circle");
  element.classList.add("fa-play-circle");
}
//Funcion para control del volumen de la musica
const volumen = document.getElementById("volumen");
volumen.addEventListener("input", (e) => {
  const vol = e.target.value; // Declarar vol como una variable local
  player.volume = vol;
});

//Funcion para control del volumen de la publicidad
const volumenPublicidad = document.getElementById("volumenPublicidad");
volumenPublicidad.addEventListener("input", (e) => {
  const volPublicidad = e.target.value;
  publicidad.volume = volPublicidad;
});

//Funcion para el control de la musica y la publicidad
function subirMusicaGlobal() {
  var volMusica = parseFloat(document.getElementById("volumen").value);
  var volPublicidad = parseFloat(
    document.getElementById("volumenPublicidad").value
  );
  // Asegúrate de que el valor no supere el máximo permitido
  if (volMusica >= 1 || volMusica + 0.1 >= 1) {
    volMusica = 1;
  } else {
    volMusica = volMusica + 0.1;
    player.volume = volMusica;
  }

  if (volPublicidad >= 1 || volPublicidad + 0.1 >= 1) {
    volPublicidad = 1;
  } else {
    volPublicidad = volPublicidad + 0.1;
    publicidad.volume = volPublicidad;
  }
  document.getElementById("volumen").value = volMusica;
  document.getElementById("volumenPublicidad").value = volPublicidad;
}

function subirVolumenMusica() {
  var volMusica = parseFloat(document.getElementById("volumen").value);
  // Asegúrate de que el valor no supere el máximo permitido
  if (volMusica >= 1 || volMusica + 0.1 >= 1) {
    volMusica = 1;
  } else {
    volMusica = volMusica + 0.1;
    player.volume = volMusica;
  }
  document.getElementById("volumen").value = volMusica;
}

function subirVolumenPublicidad() {
  var volPublicidad = parseFloat(
    document.getElementById("volumenPublicidad").value
  );
  // Asegúrate de que el valor no supere el máximo permitido
  if (volPublicidad >= 1 || volPublicidad + 0.1 >= 1) {
    volPublicidad = 1;
  } else {
    volPublicidad = volPublicidad + 0.1;
    publicidad.volume = volPublicidad;
  }
  document.getElementById("volumenPublicidad").value = volPublicidad;
}

//Bajar musica de manera global
function bajarMusicaGlobal() {
  var volMusica = parseFloat(document.getElementById("volumen").value);
  var volPublicidad = parseFloat(
    document.getElementById("volumenPublicidad").value
  );
  // Asegúrate de que el valor no supere el máximo permitido
  if (volMusica <= 0 || volMusica - 0.1 <= 0) {
    volMusica = 0;
    player.volume = 0;
  } else {
    volMusica = volMusica - 0.1;
    player.volume = volMusica;
  }

  if (volPublicidad <= 0 || volPublicidad - 0.1 <= 0) {
    volPublicidad = 0;
  } else {
    volPublicidad = volPublicidad - 0.1;
    publicidad.volume = volPublicidad;
  }
  document.getElementById("volumen").value = volMusica;
  document.getElementById("volumenPublicidad").value = volPublicidad;
}

function bajarVolumenMusica() {
  var volMusica = parseFloat(document.getElementById("volumen").value);
  // Asegúrate de que el valor no supere el máximo permitido
  if (volMusica <= 0 || volMusica - 0.1 <= 0) {
    volMusica = 0;
    player.volume = 0;
  } else {
    volMusica = volMusica - 0.1;
    player.volume = volMusica;
  }
  document.getElementById("volumen").value = volMusica;
}

function bajarVolumenPublicidad() {
  var volPublicidad = parseFloat(
    document.getElementById("volumenPublicidad").value
  );
  // Asegúrate de que el valor no supere el máximo permitido
  if (volPublicidad <= 0 || volPublicidad - 0.1 <= 0) {
    volPublicidad = 0;
    publicidad.volume = 0;
  } else {
    volPublicidad = volPublicidad - 0.1;
    publicidad.volume = volPublicidad;
  }
  document.getElementById("volumenPublicidad").value = volPublicidad;
}

function bajarVolumen() {
  var vol = document.getElementById("volumen").value;
  document.getElementById("volumen").value = vol / 3;
  player.volume = vol / 3;
}

function restaurarVolumen() {
  var vol = document.getElementById("volumen").value;
  document.getElementById("volumen").value = vol * 3;
  player.volume = vol * 3;
  console.log("Se restauro el audio");
}

//Funcion para reproducir la proxima cancion
function nextMusic() {
  const source = document.getElementById("source");
  cantidadCanciones = canciones.length;
  var musicaActual = Number(indiceActual[0]);
  if (cola.length > 0) {
    siguiente = cola[0];
    cola.shift();
  } else {
    if (!aleatorio.checked) {
      if (canciones.length == musicaActual + 1) {
        var siguiente = 0;
      } else {
        var siguiente = musicaActual + 1;
      }
    } else {
      if (canciones.length == indicePlayListAleatoria + 1) {
        indicePlayListAleatoria = 0;
        var siguiente = musicaAleatoria[indicePlayListAleatoria];
        indicePlayListAleatoria = indicePlayListAleatoria + 1;
      } else {
        var siguiente = musicaAleatoria[indicePlayListAleatoria];
        indicePlayListAleatoria = indicePlayListAleatoria + 1;
      }
    }
  }

  removeActive();
  var item = document.getElementById(siguiente);
  item.classList.add("active");
  loadMusic(canciones[siguiente]);
  player.play();
  indiceActual[0] = siguiente;
  reproduccionActual("Reproduciendo: " + canciones[siguiente]);
  classIconPlay();
}
//Funcion para reproducir la cancion anterior
function prevMusic() {
  const source = document.getElementById("source");
  var musicaActual = Number(indiceActual[0]);
  if (musicaActual == 0) {
    var anterior = canciones.length - 1;
  } else {
    var anterior = musicaActual - 1;
  }
  removeActive();
  var item = document.getElementById(anterior);
  item.classList.add("active");
  loadMusic(canciones[anterior]);
  player.play();
  indiceActual[0] = anterior;
  reproduccionActual("Reproduciendo: " + canciones[anterior]);
  classIconPlay();
}
//Funcion para remover todas las clases css activas
function removeActive() {
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  return elems;
}
//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto) {
  document.getElementById("currentPlay").innerText = texto;
}
//Funcion para cargar las canciones en el reproductor
function loadMusic(ruta) {
  var source = document.getElementById("source");
  var folder = "audio"; //Carpeta donde tenemos almancenada la musica
  source.src = folder + "/" + ruta;
  var index = (indiceActual[0] = canciones.indexOf(ruta));
  removeActive();
  var item = document.getElementById(index);
  item.classList.add("active");
  reproduccionActual("Reproduciendo: " + ruta);
  player.load();
}

// Funcion para cargar audios
function loadAudio() {
  var publicidad = document.getElementById("publicidad");
  if (indicePublicidad >= 0 && indicePublicidad < audiosPublicidad.length) {
    publicidad.src = audiosPublicidad[indicePublicidad];
  } else {
    console.log("Índice fuera de rango: " + indicePublicidad);
    indicePublicidad = 0;
  }
}

function reproducirAudio() {
  publicidad.play();
  if (indicePublicidad == audiosPublicidad.length - 1) {
    indicePublicidad = 0;
  }
}
// Esperar a que termine la reproducción actual antes de cambiar la fuente
publicidad.addEventListener("ended", () => {
  var vol = document.getElementById("volumen").value;
  if (vol * 3 > 1) {
    document.getElementById("volumen").value = 1;
    player.volume = 1;
  } else {
    document.getElementById("volumen").value = vol * 3;
    player.volume = vol * 3;
  }

  console.log("Se restauro el audio");
  indicePublicidad = indicePublicidad + 1;
  console.log("Indice: " + indicePublicidad);
  loadAudio();
});

//Funcion para actualizar la barra de progreso del reproductor
function updateProgress() {
  if (player.currentTime > 0) {
    const barra = document.getElementById("progress");
    barra.value = (player.currentTime / player.duration) * 100;

    var duracionSegundos = player.duration.toFixed(0);
    dura = secondsToString(duracionSegundos);
    var actualSegundos = player.currentTime.toFixed(0);
    actual = secondsToString(actualSegundos);

    duracion = actual + " / " + dura;
    document.getElementById("timer").innerText = duracion;
  }
  var duracionPublicidad = publicidad.duration / 2;
  if (
    player.duration - player.currentTime <= duracionPublicidad &&
    player.duration - player.currentTime > 0 &&
    !cincoSegundosNotificados
  ) {
    console.log("Faltan 5 segundos");
    console.log(publicidad.duration);
    reproducirAudio();
    cincoSegundosNotificados = true;
    bajarVolumen();
  }
  if (player.ended) {
    nextMusic(); //Reproducir la siguiente pista
    cincoSegundosNotificados = false;
  }
}

//Funcion para pausar o darle play
function togglePlay() {
  if (player.paused) {
    toggleIcon();
    return player.play();
  } else {
    toggleIcon();
    return player.pause();
  }
}

//Funcion para pausar al presionar la barra espaciadora:
document.addEventListener("keydown", function (event) {
  // Verifica si la tecla presionada es la barra espaciadora
  switch (event.code) {
    case "Space":
      event.preventDefault();
      togglePlay();
      break;
    case "ArrowUp":
      event.preventDefault();
      subirMusicaGlobal(); // Función para subir el volumen
      break;
    case "ArrowDown":
      event.preventDefault();
      bajarMusicaGlobal(); // Función para bajar el volumen
      break;
    case "ArrowLeft":
      event.preventDefault();
      prevMusic(); // Función para ir a la pista anterior
      break;
    case "ArrowRight":
      event.preventDefault();
      nextMusic(); // Función para ir a la siguiente pista
      break;
    case "KeyA":
      bajarVolumenMusica();
      break;
    case "KeyS":
      subirVolumenMusica();
      break;
    case "KeyZ":
      bajarVolumenPublicidad();
      break;
    case "KeyX":
      subirVolumenPublicidad();
      break;
    default:
      break;
  }
});
//Funcion para cambiar el icono play o pause
function toggleIcon() {
  var element = document.getElementById("iconPlay");
  element.classList.toggle("fa-pause-circle");
  element.classList.toggle("fa-play-circle");
}

//Funcion para que al dar click sobre la barra de progeso se permita adelantar
function adelantar(e) {
  console.log("Diste click en la barra de tiempo");
  const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
  console.log(e);
}
//Funcion para convertir segundos a minutos y horas
function secondsToString(seconds) {
  var hour = "";
  if (seconds > 3600) {
    hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    hour += ":";
  }
  var minute = Math.floor((seconds / 60) % 60);
  minute = minute < 10 ? "0" + minute : minute;
  var second = seconds % 60;
  second = second < 10 ? "0" + second : second;
  return hour + minute + ":" + second;
}

//Funcion que lee la carpeta audios donde esta la musica
function leerCarpeta() {
  const input = document.getElementById("folderInput");
  const output = document.getElementById("output");
  const files = input.files;
  //const filesArray = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type === "audio/mpeg") {
      canciones.push(file.name);
    }
  }
  document.getElementById("playList").appendChild(crearPlayList());
  listadoMusica = document.getElementById("listadoMusica");
  listadoMusica.onclick = (e) => {
    console.log("Se dio click en una cancion");
    const itemClick = e.target;
    removeActive();
    itemClick.classList.add("active");
    reproduccionActual("Reproduciendo: " + itemClick.innerText);
    loadMusic(itemClick.innerText);
    player.play();
    indiceActual[0] = e.target.id;
    classIconPlay();
  };
  loadMusic(canciones[0]);
  updateProgress();
  console.log(canciones);

  listadoMusica.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Previene que aparezca el menú contextual por defectoconsole.log("Clic derecho detectado!");
    console.log("Diste click derecho! el indice fue: " + event.target.id);

    cola.push(event.target.id); //Agregamos una cancion al array cola
    //Se muestra el mensaje en la pantalla
    var textoCola = document.getElementById("textoCola");
    textoCola.textContent =
      "Se agrego " + canciones[event.target.id] + " a la cola!";

    var contenedorCola = document.getElementById("cola");
    contenedorCola.style.visibility = "visible";
    contenedorCola.style.opacity = "1";

    // Después de 3 segundos, ocultar con desvanecimiento
    setTimeout(function () {
      contenedorCola.style.opacity = "0";

      // Esperar el tiempo de transición para ocultar completamente el elemento
      setTimeout(function () {
        contenedorCola.style.visibility = "hidden";
      }, 500); // 1000 ms es el tiempo de la transición en el CSS
    }, 1500); // El tiempo que el elemento permanece visible
  });
}

//Funcion que lee los archivos de la carpeta publicidad donde estan los audios publicitarios

function leerCarpetaPublicidad() {
  const input = document.getElementById("folderPublicidad");
  const files = input.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type === "audio/mpeg") {
      const rutaCompleta = file.webkitRelativePath || file.name;
      audiosPublicidad.push(rutaCompleta);
    }
  }
  console.log(audiosPublicidad);
  loadAudio();
}

//Funcion para crear una playlist aleatoria
function crearPlayListAleatoria(tamano) {
  for (let i = 0; i < tamano; i++) {
    let aleatorio;
    do {
      aleatorio = Math.floor(Math.random() * tamano);
    } while (musicaAleatoria.includes(aleatorio));
    musicaAleatoria[i] = aleatorio;
  }
}

//Crear la playlist cuando se oprima el checkbox
aleatorio.addEventListener("change", function () {
  musicaAleatoria = [];
  if (canciones.length > 0) {
    if (aleatorio.checked) {
      crearPlayListAleatoria(canciones.length);
    }
  } else {
    aleatorio.checked = false;
  }
});

//Funcion para forzar el checkbox de aleatorio siempre este desactivado nal recargar la pagina
window.onload = function () {
  aleatorio.checked = false; // Asegúrate de que el checkbox esté desmarcado
};
