/* jshint esversion: 6 */

const game = new Game();
const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
const resetButton = document.querySelector('#btn__reset');
const phraseUl = document.querySelector('#phrase ul');
const qwerty = document.querySelector('#qwerty');
const letters = qwerty.querySelectorAll('button');
const hearts = document.querySelectorAll('.tries img');
const h3 = overlay.querySelector(' h3');
const reveal = overlay.querySelector('.reveal');

const phrases = [
  'Ace in the hole',
  'Cut above the rest',
  'Famous last words',
  'Better late than never',
  'Brave new world',
  'Live long and prosper',
  'Ignorance is bliss',
  'A blessing in disguise',
  'live love laugh',
  'The whole nine yards',
  'As right as rain',
  'Calm before the storm',
  'Haste makes waste',
  'Let sleeping dogs lie',
  'Weather the storm',
  'Shape up or ship out',
  'Two peas in a pod',
  'Leave no stone unturned',
  'It takes two to tango',
  'Head in the clouds',
];

/**
 * Hides the overlay and resets the playing field elements.
 */
const resetDisplay = () => {
  game.missed = 0;
  overlay.className = 'start';
  h3.style.display = '';
  reveal.style.display = '';
  phraseUl.innerHTML = '';
  letters.forEach(letter => {
    letter.removeAttribute('class');
    letter.removeAttribute('disabled');
  });
  hearts.forEach(heart => heart.src = './images/liveHeart.png');
  overlay.style.display = "none";
};

/**
 * Disables the chosen button on the onscreen keyboard and calls the handleInteraction() method of the Game class.
 * @param {object} key - The '#qwerty button' element that the user typed or clicked.
 */
const markButton = key => {
  key.className = 'chosen';
  key.setAttribute('disabled', true);
  game.handleInteraction(key.textContent);
};

// When the user clicks the "Start Game" button, call resetDisplay(), create a new Game object, and start the game.
resetButton.addEventListener('click', () => {
  resetDisplay();
  new Game(phrases, 0).startGame();
});

// Listens to each of the onscreen keyboard buttons, so that clicking a button calls the markButton() function.
qwerty.addEventListener('click', event => {
  if (event.target.tagName === "BUTTON") markButton(event.target);
});

// Listens for physical keyboard "keypress" event, then calls the markButton() function for the associated onscreen keyboard button.
window.addEventListener('keypress', event => {
  let key = qwerty.querySelector(`button[data-key="${event.charCode}"]`);
  if (key && overlay.style.display === "none") markButton(key);
});