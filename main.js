// This file will be used across all pages of the site

let coinAmount = window.localStorage.getItem('coins');
let currentCritter = window.localStorage.getItem('critter');
let currentOutfit = window.localStorage.getItem('outfit');
let currentBackground = window.localStorage.getItem('background');

let coinDisplay = document.getElementById('coin-bag');
//let critterDisplay = document.getElementById('critter-character');
let critterOutfit = document.getElementsByClassName('cls-main');
let backgroundDisplay = document.getElementById('critter-background');

// function will assign the items from local storage to their respective locations
function setPlayerItems() {
    coinDisplay.innerHTML = `Coins: ${coinAmount}`;
    critterOutfit[0].style.fill = currentOutfit;
    critterOutfit[1].style.fill = currentOutfit;
    backgroundDisplay.style.backgroundColor = currentBackground;
}

// function will be called when any purchase button is clicked


setPlayerItems();