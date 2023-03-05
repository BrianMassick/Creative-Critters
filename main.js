// This file will be used across all pages of the site

let coinAmount;
let currentCritter;
let currentOutfit;
let currentBackground;

let coinDisplay = document.getElementById('coin-bag');
let critterOutfit = document.getElementById('critter-character');
let backgroundDisplay = document.getElementById('critter-background');

// Featured item buttons
let item1 = document.getElementById('b-1');
let item2 = document.getElementById('b-2');
let item3 = document.getElementById('b-3');

// Event listeners for buttons in featured items (homepage)
if (document.URL.includes("index.html")) {
    item1.addEventListener('click', function() { makePurchase('item-1', 'background') });
    item2.addEventListener('click', function() { makePurchase('item-2', 'background') });
    item3.addEventListener('click', function() { makePurchase('item-3', 'outfit') });
}

//Is this a new user
const newUser = localStorage.getItem('visit') == null;
if (newUser) {
    coinAmount = 100;
    setLocalStorage();
} else {
    getLocalStorage();
}

// function to set local storage values
function setLocalStorage() {
    if (document.URL.includes("index.html")) {
        window.localStorage.setItem('critter', currentCritter);
        window.localStorage.setItem('outfit', currentOutfit);
        window.localStorage.setItem('background', currentBackground);
    } else {}
    window.localStorage.setItem('visit', 'returning');
    window.localStorage.setItem('coins', coinAmount);
    setPlayerItems();
}

// function to get local storage values
function getLocalStorage() {
    if (document.URL.includes("index.html")) {
        currentCritter = window.localStorage.getItem('critter');
        currentOutfit = window.localStorage.getItem('outfit');
        currentBackground = window.localStorage.getItem('background');
    } else {}
    coinAmount = window.localStorage.getItem('coins');
    setPlayerItems();
}

// function will assign the items from local storage to their respective locations
function setPlayerItems() {
    if (document.URL.includes("index.html")) {
        critterOutfit.style.backgroundImage = currentOutfit;
        backgroundDisplay.style.backgroundImage = currentBackground;
    } else {}
    coinDisplay.innerHTML = `${coinAmount}`;
}

// function will be called when any purchase button is clicked
function makePurchase(idName, itemType) {
    let theItem = document.getElementById(`${idName}`);
    let newItem = window.getComputedStyle(theItem);
    if (coinAmount < 100) { alert('Not enough coins!'); return; }
    console.log(newItem);
    if (itemType == 'outfit') {
        theItem.style.backgroundImage = newItem.getPropertyValue('background-image');
        setCritterOutfit(theItem);
    } else if (itemType == 'background') {
        theItem.style.backgroundImage = newItem.getPropertyValue('background-image');
        setCritterBackground(theItem);
    }

    alert('Thanks for your purchase!');
    coinSpent(100);
}

// Handles earning of coins
function coinWinnings(amount) {
    coinAmount = parseInt(coinAmount) + amount;
    window.localStorage.setItem('coins', coinAmount);
    coinDisplay.innerHTML = `${coinAmount}`;
}

// Handles spending coins
function coinSpent(amount) {
    coinAmount = parseInt(coinAmount) - amount;
    window.localStorage.setItem('coins', coinAmount);
    coinDisplay.innerHTML = `${coinAmount}`;
}

// Handles setting of critter backgrounds
function setCritterBackground(background) {
    currentBackground = background.style.backgroundImage;
    window.localStorage.setItem('background', currentBackground);
    if (document.URL.includes("index.html")) {
        backgroundDisplay.style.backgroundImage = currentBackground;
    }
}

// Handles setting of critter outfit
function setCritterOutfit(outfit) {
    currentOutfit = outfit.style.backgroundImage;
    window.localStorage.setItem('outfit', currentOutfit);
    if (document.URL.includes("index.html")) {
        critterOutfit.style.backgroundImage = currentOutfit;
    }
}