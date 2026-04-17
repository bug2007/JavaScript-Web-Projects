const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select media stream, pass to vid element, then play
async function selectMediaStream() {
    try {
        // a live video feed of the screen (entire screen / a window / a browser tab)
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {   // e.g width, height, duration
            videoElement.play();
        }
    } catch (error) {

    }
}

button.addEventListener('click', async () => {
    button.disabled = true;
    
    // start picture in picture
    await videoElement.requestPictureInPicture();
    button.disabled = falspicture;
});

selectMediaStream();