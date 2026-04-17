const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash api
let count = 5;
const apiKey = 'n8m_zzFD_eI7YH9zKYCT68nu2Y81MqAE42bllKvs6-w';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if an img was loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create <a>
        const item = document.createElement('a');
        setAttributes(item, {href: photo.links.html, target: '_blank'});

        // create <img>
        const img = document.createElement('img');
        setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description});

        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    };
})

getPhotos();