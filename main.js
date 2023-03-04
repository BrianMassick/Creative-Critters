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
    window.localStorage.setItem('visit', 'returning');
    window.localStorage.setItem('coins', coinAmount);
    window.localStorage.setItem('critter', currentCritter);
    window.localStorage.setItem('outfit', currentOutfit);
    window.localStorage.setItem('background', currentBackground);
    setPlayerItems();
}

// function to get local storage values
function getLocalStorage() {
    coinAmount = window.localStorage.getItem('coins');
    currentCritter = window.localStorage.getItem('critter');
    currentOutfit = window.localStorage.getItem('outfit');
    currentBackground = window.localStorage.getItem('background');
    setPlayerItems();
}

// function will assign the items from local storage to their respective locations
function setPlayerItems() {
    coinDisplay.innerHTML = `${coinAmount}`;
    critterOutfit[0].style.fill = currentOutfit;
    critterOutfit[1].style.fill = currentOutfit;
    backgroundDisplay.style.backgroundColor = currentBackground;
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