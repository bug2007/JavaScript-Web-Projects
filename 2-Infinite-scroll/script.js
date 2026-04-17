// Unsplash api
const count = 10;
const apiKey = 'Ho8b6pEdAA56dJMAxO8VoJMlQco-hjo0KfexiiRxPso';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {

    }
}

getPhotos();