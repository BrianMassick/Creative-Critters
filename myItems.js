import { MYBACKGROUNDS } from './itemBank/ownedBackgrounds.js';
import { MYOUTFITS } from './itemBank/ownedOutfits.js';

let outfitShowcaseDisplay = document.getElementById('outfit-showcase');
let backgroundShowcaseDisplay = document.getElementById('background-showcase');

// function creates background showcase with owned items
function backgroundShowcase() {
    var showcaseSize = MYBACKGROUNDS.length;
    let i = 0;

    while (i < showcaseSize) {
        var div = document.createElement('div');
        var section = document.createElement('section');
        var button = document.createElement('button');

        div.className = 'outfit-display';
        section.id = `background-image-${i}`;
        button.className = 'outfit-button';

        section.style.backgroundImage = `url("http://127.0.0.1:5500/backgrounds/${MYBACKGROUNDS[i]}Background.jpg")`;
        section.style.backgroundPosition = 'center';

        button.onclick = function(i) {
            return function() {
                equipItem(`background-image-${i}`, 'background');
            };
        }(i);

        button.insertAdjacentHTML('beforeend', 'Equip');
        div.appendChild(section);
        div.appendChild(button);
        backgroundShowcaseDisplay.appendChild(div);
        ++i;
    }
}

// function creates outfit showcase with owned items
function outfitShowcase() {
    var showcaseSize = MYOUTFITS.length;
    let i = 0;

    while (i < showcaseSize) {
        var div = document.createElement('div');
        var section = document.createElement('section');
        var button = document.createElement('button');

        div.className = 'outfit-display';
        section.id = `outfit-image-${i}`;
        button.className = 'outfit-button';

        button.onclick = function(i) {
            return function() {
                equipItem(`outfit-image-${i}`, 'outfit');
            };
        }(i);

        section.style.backgroundImage = `url("http://127.0.0.1:5500/outfits/${MYOUTFITS[i]}.png")`;
        section.style.backgroundPosition = 'center';

        button.insertAdjacentHTML('beforeend', 'Equip');
        div.appendChild(section);
        div.appendChild(button);
        outfitShowcaseDisplay.appendChild(div);
        ++i;
    }
}

outfitShowcase();
backgroundShowcase();