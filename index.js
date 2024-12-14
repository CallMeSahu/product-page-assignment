const mainImg = document.getElementById('mainImg');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
const decreaseQuantity = document.getElementById('decreaseQuantity');
const increaseQuantity = document.getElementById('increaseQuantity');
const quantity = document.getElementById('quantity');

let currentImageIndex = 0;
let images = [];

let touchStartX = 0;
let touchEndX = 0;

const fetchImages = async () => {
    try {
        const res = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
        const data = await res.json();
        images = data.map(img => img.download_url);
        updateCarousel(currentImageIndex);
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

const updateCarousel = index => {
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

navLeft.addEventListener('click', () => {
    currentImageIndex === 0 ? currentImageIndex = images.length - 1 : currentImageIndex -= 1;
    updateCarousel(currentImageIndex);
})

navRight.addEventListener('click', () => {
    currentImageIndex === images.length - 1 ? currentImageIndex = 0 : currentImageIndex += 1;
    updateCarousel(currentImageIndex);
})

const checkDirection = () => {
    if(touchEndX < touchStartX){
        navRight.click();
    }
    if(touchEndX > touchStartX){
        navLeft.click();
    }
}

mainImg.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
})

mainImg.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    checkDirection();
})

decreaseQuantity.addEventListener('click', () => {
    if(parseInt(quantity.value) > quantity.min){
        quantity.value = parseInt(quantity.value) - 1;
    }
})

increaseQuantity.addEventListener('click', () => {
    if(parseInt(quantity.value) < quantity.max){
        quantity.value = parseInt(quantity.value) + 1
    }
})

fetchImages();