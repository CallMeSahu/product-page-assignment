const mainImg = document.getElementById('mainImg');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');

let currentImageIndex = 0;
let images = [];

const fetchImages = async () => {
    try {
        const res = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
        const data = await res.json();
        images = data.map(img => img.download_url);
        updateCarousal(currentImageIndex);
        createThumbnails();
    } catch (error) {
        console.log('Error while fethcing images', error)
    }
}

const createThumbnails = () => {
    thumbnailsContainer.innerHTML = '';
    images.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img;
        thumbnail.classList.add('thumbnail');
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateCarousal(currentImageIndex);
        })
        thumbnailsContainer.appendChild(thumbnail);
    })
    updateActiveThumbnail(currentImageIndex);
}

const updateCarousal = index => {
    if(images.length !== 0){
        mainImg.src = images[index];
        updateActiveThumbnail(index);
    }
}

const updateActiveThumbnail = index => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('thumbnail-active'));
    if (thumbnails[index]) {
        thumbnails[index].classList.add('thumbnail-active');
    }   
}

fetchImages();