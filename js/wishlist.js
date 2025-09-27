// wishlist.js

// function filterByType(type) {
//     currentFilter = type;
    
//     // update active button
//     document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
//     event.target.classList.add('active');
    
//     // clear and reload images with filter
//     const gridContainer = document.getElementById('grid-container');
//     gridContainer.innerHTML = '';
    
//     const filteredData = type === 'all' ? allPhotoData : allPhotoData.filter(item => item.type === type);
    
//     filteredData.forEach(data => {
//         const imagePath = data.image ? `img/pcimgs/${data.image}` : '';
//         createPhotoCard(imagePath, data, gridContainer);
//     });
// }

// async function loadImages() {
//     const gridContainer = document.getElementById('grid-container');
//     allPhotoData = [...photoData]; // store original data
    
//     photoData.forEach(data => {
//         const imagePath = data.image ? `img/pcimgs/${data.image}` : '';
//         createPhotoCard(imagePath, data, gridContainer);
//     });
// }

// typewriter variables
const typingTexts = ["yushi pobs", "yushi album pcs", "yushi md pcs", "riku pobs", "riku album pcs", "riku md pcs"];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

// filter variables
let currentFilter = 'all';
let allPhotoData = [];

function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        // remove chars
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeWriter, 500); // pause before new text
        } else {
            setTimeout(typeWriter, 50); // deletion speed
        }
    } else {
        // add chars
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000); // pause on complete
        } else {
            setTimeout(typeWriter, 100); // typing speed
        }
    }
}

function createFilterButtons() {
    const gridContainer = document.getElementById('grid-container');
    
    // create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    
    // get unique types from photoData
    const types = ['all', ...new Set(photoData.map(item => item.type).filter(Boolean))];
    
    types.forEach(type => {
        const button = document.createElement('button');
        button.className = `filter-button ${type === 'all' ? 'active' : ''}`;
        button.textContent = type === 'all' ? 'all' : type.charAt(0) + type.slice(1);
        button.onclick = () => filterByType(type);
        filterContainer.appendChild(button);
    });
    
    // insert filter container before grid
    gridContainer.parentNode.insertBefore(filterContainer, gridContainer);
}

function filterByType(type) {
    currentFilter = type;
    
    // update active button
    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // clear grid
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    
    const filteredData = type === 'all' ? allPhotoData : allPhotoData.filter(item => item.type === type);
    
    // create all cards first (hidden)
    const photoCards = [];
    filteredData.forEach(data => {
        const imagePath = data.image ? `img/pcimgs/${data.image}` : '';
        const photoCard = createPhotoCard(imagePath, data);
        photoCard.style.opacity = '0'; // start hidden
        photoCards.push(photoCard);
        gridContainer.appendChild(photoCard);
    });
    
    // trigger simultaneous fade-in after a brief delay
    requestAnimationFrame(() => {
        photoCards.forEach(card => {
            card.style.animation = 'fadeIn 0.5s ease-in-out forwards';
        });
    });
}

async function loadImages() {
    const gridContainer = document.getElementById('grid-container');
    allPhotoData = [...photoData]; // store original data
    
    // create all cards first (hidden)
    const photoCards = [];
    photoData.forEach(data => {
        const imagePath = data.image ? `img/pcimgs/${data.image}` : '';
        const photoCard = createPhotoCard(imagePath, data);
        photoCard.style.opacity = '0'; // start hidden
        photoCards.push(photoCard);
        gridContainer.appendChild(photoCard);
    });
    
    // trigger simultaneous fade-in after a brief delay
    requestAnimationFrame(() => {
        photoCards.forEach(card => {
            card.style.animation = 'fadeIn 0.5s ease-in-out forwards';
        });
    });
}

function createPhotoCard(imagePath, data) {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    
    // add type as data attribute for additional styling if needed
    if (data.type) {
        photoCard.setAttribute('data-type', data.type);
    }
    
    const img = document.createElement('img');
    if (imagePath) {
        img.src = imagePath;
        img.alt = data.name;
        
        // FALLBACK: error handling for missing imgs
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Image not found';
        };
    } else {
        // placeholder img
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        img.alt = 'No image specified';
    }
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'photo-name';
    // nameDiv.textContent = data.name;
    
    const descDiv = document.createElement('div');
    descDiv.className = 'photo-description';
    descDiv.innerHTML = data.description;
    
    // add type badge if type exists
    if (data.type) {
        const typeBadge = document.createElement('span');
        typeBadge.className = 'type-badge';
        typeBadge.textContent = data.type;
        // descDiv.appendChild(typeBadge);
    }
    
    photoCard.appendChild(img);
    photoCard.appendChild(nameDiv);
    photoCard.appendChild(descDiv);
    
    return photoCard;
}

// load imgs when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFilterButtons();
    loadImages();
    // start typing animation
    setTimeout(typeWriter, 1000); // start after 1 sec
});