import { BACKGROUNDS } from './itemBank/backgrounds.js';
import { OUTFITS } from './itemBank/outfits.js';

let outfitShowcaseDisplay = document.getElementById('outfit-showcase');
let backgroundShowcaseDisplay = document.getElementById('background-showcase');

// function creates background showcase
function backgroundShowcase() {
    var showcaseSize = BACKGROUNDS.length;
    let i = 0;

    while (i < showcaseSize) {
        var div = document.createElement('div');
        var section = document.createElement('section');
        var button = document.createElement('button');
        var img = document.createElement('img');

        div.className = 'outfit-display';
        section.id = `background-image-${i}`;
        section.style.backgroundImage = `url("http://127.0.0.1:5500/backgrounds/${BACKGROUNDS[i]}Background.jpg")`;
        section.style.backgroundPosition = 'center';

        // if item is owned, it will not display (doesnt work with multiple items yet)
        if (ownedBackgrounds.includes(BACKGROUNDS[i])) {
            button.className = 'owned-button';
            button.insertAdjacentHTML('beforeend', 'Owned');
        } else {
            button.className = 'outfit-button';

            button.onclick = function(i) {
                return function() {
                    makePurchase(`background-image-${i}`, 'background', BACKGROUNDS[i]);
                };
            }(i);

            img.src = './images/Coin.png';
            button.appendChild(img);
            button.insertAdjacentHTML('beforeend', '100');
        }


        div.appendChild(section);
        div.appendChild(button);
        backgroundShowcaseDisplay.appendChild(div);
        ++i;
    }
}

// function creates outfit showcase
function outfitShowcase() {
    var showcaseSize = OUTFITS.length;
    let i = 0;

    while (i < showcaseSize) {
        var div = document.createElement('div');
        var section = document.createElement('section');
        var button = document.createElement('button');
        var img = document.createElement('img');

        div.className = 'outfit-display';
        section.id = `outfit-image-${i}`;
        section.style.backgroundImage = `url("http://127.0.0.1:5500/outfits/${OUTFITS[i]}.png")`;
        section.style.backgroundPosition = 'center';

        // if item is owned, it will display owned (doesnt work with multiple items yet)
        if (ownedOutfits.includes(OUTFITS[i])) {
            button.className = 'owned-button';

            button.insertAdjacentHTML('beforeend', 'Owned');

        } else {
            button.className = 'outfit-button';

            button.onclick = function(i) {
                return function() {
                    makePurchase(`outfit-image-${i}`, 'outfit', OUTFITS[i]);
                };
            }(i);

            img.src = './images/Coin.png';
            button.appendChild(img);
            button.insertAdjacentHTML('beforeend', '100');
        }

        div.appendChild(section);
        div.appendChild(button);
        outfitShowcaseDisplay.appendChild(div);
        ++i;
    }
}

outfitShowcase();
backgroundShowcase();