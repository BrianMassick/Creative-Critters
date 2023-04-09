// This file will be used across all pages of the site

let coinAmount;
let currentCritter;
let currentOutfit;
let currentBackground;

let ownedBackgrounds = ['hill'];
let ownedOutfits = ['bunny-basic'];

let coinDisplay = document.getElementById('coin-bag');
let critterOutfit = document.getElementById('critter-character');
let backgroundDisplay = document.getElementById('critter-background');

//Is this a new user
const newUser = localStorage.getItem('visit') == null;
if (newUser) {
    coinAmount = 1000;
    setLocalStorage();
} else {
    getLocalStorage();
}

// function to set local storage values
function setLocalStorage() {
    if (document.URL.includes("index.html") || document.URL.includes("myItems.html")) {
        window.localStorage.setItem('critter', currentCritter);
        window.localStorage.setItem('outfit', currentOutfit);
        window.localStorage.setItem('background', currentBackground);
    } else {}
    localStorage.setItem('ownedOutfits', JSON.stringify(ownedOutfits));
    localStorage.setItem('ownedBackgrounds', JSON.stringify(ownedBackgrounds));
    window.localStorage.setItem('visit', 'returning');
    window.localStorage.setItem('coins', coinAmount);
    setPlayerItems();
}

// function to get local storage values
function getLocalStorage() {
    if (document.URL.includes("index.html") || document.URL.includes("myItems.html")) {
        currentCritter = window.localStorage.getItem('critter');
        currentOutfit = window.localStorage.getItem('outfit');
        currentBackground = window.localStorage.getItem('background');
    } else {}
    coinAmount = window.localStorage.getItem('coins');
    setPlayerItems();
}

// functions for setting owned items
function setOwnedOutfit(itemID) {
    ownedOutfits.push(itemID);
    localStorage.setItem('ownedOutfits', JSON.stringify(ownedOutfits));
    getOwnedOutfits();
}

function setOwnedBackground(itemID) {
    ownedBackgrounds.push(itemID);
    localStorage.setItem('ownedBackgrounds', JSON.stringify(ownedBackgrounds));
    getOwnedBackgrounds();
}

// functions to get owned items
function getOwnedOutfits() {
    ownedOutfits = JSON.parse(localStorage.ownedOutfits);
}

function getOwnedBackgrounds() {
    ownedBackgrounds = JSON.parse(localStorage.ownedBackgrounds);
}

// function will assign the items from local storage to their respective locations
function setPlayerItems() {
    if (document.URL.includes("index.html") || document.URL.includes("myItems.html")) {
        critterOutfit.style.backgroundImage = currentOutfit;
        backgroundDisplay.style.backgroundImage = currentBackground;
    } else {}
    ownedOutfits = JSON.parse(localStorage.ownedOutfits);
    ownedBackgrounds = JSON.parse(localStorage.ownedBackgrounds);
    coinDisplay.innerHTML = `${coinAmount}`;
}

// function will be called when any purchase button is clicked
function makePurchase(idName, itemType, itemID) {
    let theItem = document.getElementById(`${idName}`);
    let newItem = window.getComputedStyle(theItem);
    if (coinAmount < 100) { alert('Not enough coins!'); return; }
    console.log(newItem);
    if (itemType == 'outfit') {
        theItem.style.backgroundImage = newItem.getPropertyValue('background-image');
        setOwnedOutfit(itemID);
        setCritterOutfit(theItem);
    } else if (itemType == 'background') {
        theItem.style.backgroundImage = newItem.getPropertyValue('background-image');
        setOwnedBackground(itemID);
        setCritterBackground(theItem);
    }

    alert('Thanks for your purchase!');
    coinSpent(100);
    location.reload();
}

// function to equip item from My Items page
function equipItem(idName, itemType) {
    let theItem = document.getElementById(`${idName}`);
    let newItem = window.getComputedStyle(theItem);
    if (itemType == 'outfit') {
        theItem.style.backgroundImage = newItem.getPropertyValue('background-image');
        //alert('Item has been equipped');
        setCritterOutfit(theItem);
    } else if (itemType == 'background') {
        theItem.style.backgroundImage = newItem.getPropertyValue('background-image');
        //alert('Item has been equipped');
        setCritterBackground(theItem);
    }
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
    if (document.URL.includes("index.html") || document.URL.includes("myItems.html")) {
        backgroundDisplay.style.backgroundImage = currentBackground;
    }

    location.reload();
}

// Handles setting of critter outfit
function setCritterOutfit(outfit) {
    currentOutfit = outfit.style.backgroundImage;
    window.localStorage.setItem('outfit', currentOutfit);
    if (document.URL.includes("index.html") || document.URL.includes("myItems.html")) {
        critterOutfit.style.backgroundImage = currentOutfit;
    }

    location.reload();
}

// Function resets all local data
function resetLocalData() {
    window.localStorage.clear();
    window.location.reload();
}