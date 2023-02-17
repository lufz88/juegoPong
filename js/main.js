const mapa = document.getElementById("mapa");
mapa.width = 900;
mapa.height = 600;

const mostrarPuntaje1 = document.getElementById("puntaje1");
const mostrarPuntaje2 = document.getElementById("puntaje2");
const message = document.getElementById("message");
const button = document.getElementById("button");


let lienzo = mapa.getContext("2d")
let intervalo1;
let intervalo2;
let mapaBackground = new Image();
mapaBackground.src = "./img/canchita.jpg"
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;

class Paletas {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.velocidadY = 0;
    }

    pintarPaleta() {
        lienzo.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Pelotas {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarPelota() {
        lienzo.beginPath();
        lienzo.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
        lienzo.fill();
        lienzo.stroke();
    }

    moverPelota() {
        this.velocidadX = 10;
        this.velocidadY = 10;
        rebotar();
    }
}


let jugador1 = new Paletas(30, 100, 10, 250);
let jugador2 = new Paletas(30, 100, 860, 250);
let pelota = new Pelotas(455, 295);

function iniciarJuego(){
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    intervalo1 = setInterval(pintarMapa, 50)
    intervalo2 = setInterval(pelota.moverPelota, 50)
    window.addEventListener("keydown", sePresionoUnaTecla);
}

function pintarMapa() {
    jugador1.y += jugador1.velocidadY;
    jugador2.y += jugador2.velocidadY;
    pelota.x += pelota.velocidadX;
    pelota.y += pelota.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )

    jugador1.pintarPaleta();
    jugador2.pintarPaleta();
    pelota.pintarPelota();
}


function moverArriba1() {
    jugador1.velocidadY = -15;
}
function moverAbajo1() {
    jugador1.velocidadY = 15;
}

function detenerMovimiento1() {
    jugador1.velocidadY = 0;
}

function moverArriba2() {
    jugador2.velocidadY = -15;
}
function moverAbajo2() {
    jugador2.velocidadY = 15;
}

function detenerMovimiento2() {
    jugador2.velocidadY = 0;
}


function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba2();
            window.addEventListener("keyup", detenerMovimiento2);
            if(jugador2.y <= 0) {
                detenerMovimiento2()
            }
            break;
        
        case "ArrowDown":
            moverAbajo2();
            window.addEventListener("keyup", detenerMovimiento2);
            if(jugador2.y >= (600-jugador2.height)) {
                detenerMovimiento2()
            }
            break;
        
        case "w":
            moverArriba1();
            window.addEventListener("keyup", detenerMovimiento1);
            if(jugador1.y === 0) {
                detenerMovimiento1()
            }
            break;
        
        case "s":
            moverAbajo1();
            window.addEventListener("keyup", detenerMovimiento1);
            if(jugador1.y === (600-jugador2.height)) {
                detenerMovimiento1()
            }
            break;

        case "Enter": 
            puntajeJugador1 = 0;
            puntajeJugador2 = 0;
            pelota.moverPelota();
            break;
            
        default:
            break;
    }
}

function rebotar() {
    if(pelota.x <= jugador1.x + jugador1.width && (pelota.y >= jugador1.y && pelota.y <= (jugador1.y + jugador1.height)) || (pelota.x >= jugador2.x && (pelota.y >= jugador2.y && pelota.y <= (jugador2.y + jugador2.height)))) {
        if(pelota.velocidadX < 0) {
            pelota.velocidadX -= 1;
        } else if(pelota.velocidadX > 0) {
            pelota.velocidadX += 1;
        } else if(pelota.velocidadY > 0) {
            pelota.velocidadY += 1;
        } else if(pelota.velocidadY < 0) {
            pelota.velocidadX -= 1;
        } 
        pelota.velocidadX *= -1;
    } else if(pelota.y <= 0 || pelota.y >= 600) {
        pelota.velocidadY *= -1;
    } else if(pelota.x <= 0 || pelota.x >= 900) {
        puntajes();
        pelota.velocidadX = 10;
        pelota.velocidadY = 10;
        pelota.x = 455;
        pelota.y = 295;
        revisarPuntaje()
        
    }
}

function puntajes() {
    if(pelota.x <= 0) {
        puntajeJugador2++;
        mostrarPuntaje2.innerHTML = puntajeJugador2;
    } else if(pelota.x >= 900) {
        puntajeJugador1++;
        mostrarPuntaje1.innerHTML = puntajeJugador1;
    }
}

function revisarPuntaje() {
    if (puntajeJugador1 === 7) {
        message.innerHTML = "¡Player one wins! Press Enter to start again";
        pelota.velocidadX = 0;
        pelota.velocidadY = 0;
    } else if (puntajeJugador2 === 7) {
        message.innerHTML = "¡Player two wins! Press Enter to start again";
        pelota.velocidadX = 0;
        pelota.velocidadY = 0;
    }
}

iniciarJuego()
