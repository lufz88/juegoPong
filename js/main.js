const mapa = document.getElementById("mapa");
mapa.width = 900;
mapa.height = 600;

let lienzo = mapa.getContext("2d")
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./img/canchita.jpg"

class Paletas {
    constructor(width, height, x, y, velocidadX, velocidadY) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.velocidadX = 0;
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
        this.velocidadX = 10;
        this.velocidadY = 10;
    }

    pintarPelota() {
        lienzo.beginPath();
        lienzo.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
        lienzo.fill();
        lienzo.stroke();
    }

    moverPelota() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;
        rebotar(); 
    }
}


let jugador1 = new Paletas(30, 100, 10, 250);
let jugador2 = new Paletas(30, 100, 860, 250);
let pelota = new Pelotas(455, 295);

function iniciarJuego(){
    intervalo = setInterval(pintarMapa, 50)
    window.addEventListener("keydown", sePresionoUnaTecla);
}

function pintarMapa() {
    jugador1.y = jugador1.y + jugador1.velocidadY;
    jugador2.y = jugador2.y + jugador2.velocidadY;
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
    pelota.moverPelota();
}

function moverArriba1() {
    jugador1.velocidadY = -10;
}
function moverAbajo1() {
    jugador1.velocidadY = 10;
}

function detenerMovimiento1() {
    jugador1.velocidadX = 0;
    jugador1.velocidadY = 0;
}

function moverArriba2() {
    jugador2.velocidadY = -10;
}
function moverAbajo2() {
    jugador2.velocidadY = 10;
}

function detenerMovimiento2() {
    jugador2.velocidadX = 0;
    jugador2.velocidadY = 0;
}


function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba2();
            window.addEventListener("keyup", detenerMovimiento2);
            if(jugador2.y === 0) {
                detenerMovimiento2()
            }
            break;
        
        case "ArrowDown":
            moverAbajo2();
            window.addEventListener("keyup", detenerMovimiento2);
            if(jugador2.y === (600-jugador2.height)) {
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
        
        default:
            break;
    }
}

function rebotar() {
    if(pelota.x <= jugador1.x + jugador1.width && (pelota.y >= jugador1.y && pelota.y <= (jugador1.y + jugador1.height)) || (pelota.x >= (jugador2.x) && (pelota.y >= jugador2.y && pelota.y <= (jugador2.y + jugador2.height)))) {
        pelota.velocidadX *= -1;
    } else if(pelota.y <= 0 || pelota.y >= 600) {
        pelota.velocidadY *= -1;
    } else if(pelota.x <= 0 || pelota >= 900) {
        velocidadX = 0;
        velocidadY = 0;
    }
}

iniciarJuego()
