const userVideo = document.getElementById('user-video')

const state = { media: null }
const socket = io();

window.addEventListener('load', async e => {
    const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })
    state.media = media
    userVideo.srcObject = media
})

const startButton = document.getElementById('start-button')

startButton.addEventListener('click', ()=>{
    const mediaRecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
    })
    mediaRecorder.ondataavailable = ev => {
        console.log('binary stream available', ev.data)
        socket.emit('binarystream', ev.data)
    }
    mediaRecorder.start(25);    
})

//direct media stream cant be sent over tcp server
//so on clicking start button we need to record in real-time and convert to binary