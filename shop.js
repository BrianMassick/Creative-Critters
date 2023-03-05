import { BACKGROUNDS } from './backgrounds.js';

let backgroundShowcaseDisplay = document.getElementById('background-showcase');

// function creates background showcase
function backgroundShowcase() {
    var showcaseSize = BACKGROUNDS.length;
    let i = 0;

    console.log(showcaseSize);

    while (i < showcaseSize) {
        var div = document.createElement('div');
        var section = document.createElement('section');
        var button = document.createElement('button');
        var img = document.createElement('img');

        div.className = 'outfit-display';
        section.id = `background-image-${i}`;
        button.className = 'outfit-button';

        section.style.backgroundImage = `url("http://127.0.0.1:5500/backgrounds/${BACKGROUNDS[i]}Background.jpg")`;
        section.style.backgroundPosition = 'center';
        img.src = './images/Coin.png';

        button.onclick = function() {
            makePurchase(section.id, 'background');
        }

        button.appendChild(img);
        button.insertAdjacentHTML('beforeend', '100');
        div.appendChild(section);
        div.appendChild(button);
        backgroundShowcaseDisplay.appendChild(div);
        ++i;
    }
}

backgroundShowcase();