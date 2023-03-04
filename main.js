// This file will be used across all pages of the site

let coinAmount;
let currentCritter;
let currentOutfit;
let currentBackground;

let coinDisplay = document.getElementById('coin-bag');
//let critterDisplay = document.getElementById('critter-character');
let critterOutfit = document.getElementsByClassName('cls-main');
let backgroundDisplay = document.getElementById('critter-background');

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
        critterOutfit[0].style.fill = currentOutfit;
        critterOutfit[1].style.fill = currentOutfit;
        backgroundDisplay.style.backgroundColor = currentBackground;
    } else {}
    coinDisplay.innerHTML = `${coinAmount}`;
}

// function will be called when any purchase button is clicked
function makePurchase(idName, itemType) {
    let theItem = document.getElementById(`${idName}`);
    let newItem = getComputedStyle(theItem);
    if (itemType == 'outfit') {

    } else if (itemType == 'background') {

    } else {

    }
}

// Handles earning of coins
function coinWinnings(amount) {
    coinAmount = parseInt(coinAmount) + amount;
    window.localStorage.setItem('coins', coinAmount);
    coinDisplay.innerHTML = `${coinAmount}`;
}