/*
 * @type audio.js
 * Autor: Julio Bill Schvenger
 * Referencias: https://developer.mozilla.org/pt-BR/docs/Web/API/AudioContext
 *              http://www.javascripture.com/AudioContext
 */

var audio = new Audio();
/*
 * @type String
 * Audio do canal: Kleytton Farney
 * https://www.youtube.com/watch?v=KA7tPDEuUPU&list=RDKA7tPDEuUPU
 * Trecho da música de "Dorgival Dantas - Pode Chorar"
 */
audio.src = 'audio/PodeChorar.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

window.addEventListener("load", initMp3Player, false);

function initMp3Player() {

    document.getElementById('div_audiobox').appendChild(audio);
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    analyser = context.createAnalyser();

    canvas = document.getElementById('canvas_grafico');
    ctx = canvas.getContext('2d');

    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
}

function frameLooper() {
    window.webkitRequestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00CCFF';
    bars = fbc_array.length;

    document.getElementById('div_frequencybinario').textContent = fbc_array;

    for (var i = 0; i < bars; i++) {
        bar_x = i * 1;
        bar_width = 1;
        bar_height = -(fbc_array[i] / 2);
        ctx.fillRect(bar_x, fbc_array[i] / 2, bar_width, bar_height / 2);
    }
}