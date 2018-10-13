/* jshint esversion: 6 */

/**
 * Methods for checking and displaying correctly matched letters in the phrase, handling the creation and displaying of the hidden phrase.
 * @class Phrase
 */
class Phrase {
  /**
   * Creates an instance of Phrase.
   * @param {array} phrase - An array of letters and spaces.
   * @memberof Phrase
   */
  constructor(phrase) {
    this.phrase = phrase;
  }

  /**
   * This adds letter and space placeholders to the display when the game starts. Each letter is presented by an empty box, one list item for each letter.
   * @returns Assigns a class to the li element based on whether it's a letter or space.
   */
  addPhraseToDisplay() {
    const phrase = document.querySelector('#phrase ul');
    this.phrase.forEach(character => {
      const li = document.createElement('li');
      phrase.appendChild(li);
      li.textContent = character;
      return character !== ' ' ? li.className = 'letter' : li.className = 'space';
    });
  }
  
  /**
   * Checks to see if letter selected by player matches a letter in the phrase.
   * @param {string} key - The letter that the user typed or clicked.
   * @returns true or false.
   */
  checkLetter(key) {
    const letters = document.querySelectorAll('.letter');
    let letterFound = false;
    letters.forEach(letter => {
      if (key.toUpperCase() === letter.textContent) letterFound = true;
    });
    return letterFound;
  }

/**
 * Reveals the letter(s) on the board that match the player's selection.
 * @param {string} key - The letter that the user typed or clicked.
 */
showMatchedLetter(key) {
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
      if (key === letter.textContent) letter.classList.add('show');
    });
  }

}