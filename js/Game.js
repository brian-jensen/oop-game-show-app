/* jshint esversion: 6 */
const phrase = new Phrase();

/**
 * Methods for starting and ending the game, handling interactions, getting random phrases, checking for a win, and removing a life. 
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   * @param {array} phrases - An array of phrases to use with the game.
   * @param {number} missed - Used to track the number of missed guesses by the player.
   * @memberof Game
   */
  constructor(phrases, missed) {
    this.phrases = phrases;
    this.missed = missed;
  }

  /**
   * Randomly retrieves one of the phrases stored in the phrases array.
   * @returns A random phrase from phrases array.
   */
  getRandomPhrase() {
    return phrases[Math.floor(Math.random() * phrases.length)].toUpperCase().split('');
  }

  /**
   * Checks to see if the button typed or clicked by the player matches a letter in the phrase. If the selected letter matches, call the showMatchedLetter() method on the phrase. If it does not, then call the removeLife() method and then call the checkForWin() method.
   * @param {object} key - The '#qwerty button' element that the user typed or clicked.
   * @param {string} text - The letter that the user typed or clicked.
   */
  handleInteraction(key, text) {
    key.style.transition = '';
    if (phrase.checkLetter(text.toUpperCase())) {
      phrase.showMatchedLetter(text.toUpperCase());
      key.classList.add("green-button");
      this.checkForWin();
    } else {
      key.classList.add("red-button");
      this.removeLife();
    }
  }

  /**
   * Checks to see if the player has correctly guessed all of the letters. If the player has, call the gameOver() method with the argument of 'won';
   */
  checkForWin() {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    if (letter.length === show.length) this.gameOver('won');
  }
  
  /**
   * Increases this.missed by 1 and changes the heart icon. If the player is out of lives, call the gameOver() method with the argument of 'lost'.
   */
  removeLife() {
    const hearts = document.querySelectorAll('.tries img');
    this.missed += 1;
    hearts[hearts.length - this.missed].src = './images/lostHeart.png';
    if (this.missed === 5) this.gameOver('lost');
  }

  /**
   * Displays a message if the player wins or a different message if they lose.
   * @param {string} status - Checks if the player has won or lost.
   */
  gameOver(status) {
    const overlay = document.querySelector('#overlay');
    const title = document.querySelector('.title');
    const resetButton = document.querySelector('#btn__reset');
    const reveal = document.querySelector('.reveal');
    const h3 = overlay.querySelector('h3');
    const phraseChars = document.querySelectorAll('#phrase ul li');
    let missedPhrase = [];

    if (status === 'lost') {
      overlay.classList.replace('start', 'lose');
      overlay.style.display = "flex";
      title.textContent = `Sorry, you ${status}!`;
      resetButton.textContent = 'Try Again';
      // Reveals what the phrase was if the player lost the game.
      phraseChars.forEach(char => missedPhrase.push(char.textContent));
      reveal.innerHTML = `&sext; ${missedPhrase.join('')} &sext;`; 
      h3.style.display = "block";
      reveal.style.display = "block";
    } else {
      overlay.classList.replace('start', 'win');
      overlay.style.display = "flex";
      title.textContent = `Congrats, you ${status}!`;
      resetButton.textContent = 'Play Again';
    }
  }

 /**
 * Calls the getRandomPhrase() method, and adds that phrase to the board by calling the Phrase class' addPhraseToDisplay() method.
 */
startGame() {
    let randomPhrase = this.getRandomPhrase();
    new Phrase(randomPhrase).addPhraseToDisplay();
  }

}