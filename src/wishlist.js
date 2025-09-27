// wishlist.js

// typerwriter variables
const typingTexts = ["yushi pobs", "yushi album pcs", "yushi md pcs", "riku pobs", "riku album pcs", "riku md pcs"];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

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

async function loadImages() {
    const gridContainer = document.getElementById('grid-container');
    
    photoData.forEach(data => {
        const imagePath = data.image ? `img/pcimgs/${data.image}` : '';
        createPhotoCard(imagePath, data, gridContainer);
    });
}

function createPhotoCard(imagePath, data, container) {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    
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
    
    photoCard.appendChild(img);
    photoCard.appendChild(nameDiv);
    photoCard.appendChild(descDiv);
    container.appendChild(photoCard);
}

// load imgs when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    // start typing animation
    setTimeout(typeWriter, 1000); // start after 1 sec
});