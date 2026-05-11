const button = document.getElementById('loveButton');

const messageBox =
document.getElementById('messageBox');

/* BOTÓN ROMÁNTICO */

button.addEventListener('click', () => {

    messageBox.classList.remove('hidden');

    for(let i = 0; i < 40; i++){

        createHeart();

    }

});

/* CORAZONES */

function createHeart(){

    const heart =
    document.createElement('div');

    heart.classList.add('heart');

    heart.innerHTML = '❤️';

    heart.style.left =
    Math.random() * 100 + 'vw';

    heart.style.fontSize =
    Math.random() * 40 + 20 + 'px';

    heart.style.animationDuration =
    Math.random() * 3 + 3 + 's';

    document.querySelector('.hearts')
    .appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 6000);

}

/* GENERAR CORAZONES */

setInterval(createHeart, 300);

/* CONTADOR */

const startDate =
new Date('2024-01-01 00:00:00');

function updateTimer(){

    const now = new Date();

    const diff = now - startDate;

    const days =
    Math.floor(diff / (1000*60*60*24));

    const hours =
    Math.floor((diff / (1000*60*60)) % 24);

    const minutes =
    Math.floor((diff / (1000*60)) % 60);

    const seconds =
    Math.floor((diff / 1000) % 60);

    document.getElementById('timer')
    .innerHTML =

    `${days} días ❤️ 
     ${hours} horas ❤️ 
     ${minutes} minutos ❤️ 
     ${seconds} segundos ❤️`;

}

/* ACTUALIZAR CONTADOR */

setInterval(updateTimer, 1000);

/* KARAOKE LRC */

const audio =
document.getElementById("music");

const lyrics =
document.getElementById("lyrics");

/* GUARDAR LETRAS */

let lrcData = [];

/* CONTROLAR CAMBIO */

let currentLyric = "";

/* LEER ARCHIVO .LRC */

fetch('heavenly.lrc')

.then(response => response.text())

.then(text => {

    const lines = text.split('\n');

    lines.forEach(line => {

        const match =
        line.match(/\[(\d+):(\d+\.\d+)\](.*)/);

        if(match){

            const minutes =
            parseInt(match[1]);

            const seconds =
            parseFloat(match[2]);

            const time =
            minutes * 60 + seconds;

            const lyric =
            match[3].trim();

            lrcData.push({

                time: time,

                text: lyric

            });

        }

    });

})

.catch(error => {

    console.log(
        "Error cargando LRC:",
        error
    );

});

/* MOSTRAR LETRAS */

audio.addEventListener('timeupdate', () => {

    const currentTime =
    audio.currentTime;

    for(let i = 0; i < lrcData.length; i++){

        if(

            currentTime >=
            lrcData[i].time &&

            (

                i === lrcData.length - 1 ||

                currentTime <
                lrcData[i + 1].time

            )

        ){

            /* EVITAR REPETIR */

            if(currentLyric !== lrcData[i].text){

                currentLyric =
                lrcData[i].text;

                lyrics.innerHTML =
                currentLyric;

                /* REINICIAR ANIMACIÓN */

                lyrics.style.animation =
                "none";

                lyrics.offsetHeight;

                lyrics.style.animation =
                "lyricsAnim 1s ease";

            }

        }

    }

});

/* EFECTO PLAY */

audio.addEventListener('play', () => {

    document.body.style.transition =
    "1s";

});

/* EFECTO FINAL */

audio.addEventListener('ended', () => {

    lyrics.innerHTML =
    "❤️ Siempre Te Amaré ❤️";

});