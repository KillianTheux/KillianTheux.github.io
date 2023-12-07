const cards = document.querySelectorAll('.memory-card');
const game = document.querySelector(".memory-game");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer = 0;
let record = 0.0;

/**
 * Retourner une carte
 * 
 * Bloquer une carte le temps qu'une deuxième soit retournée
 * Retourner la deuxième carte
 */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

/**
 * Regarder si ca match
 * 
 * Vérifier si la première carte et la deuxième carte sont pareille
 * Si oui il y a un match en les deux
 * 
 * S'il y a un match, utiliser les fonctions disableCards() et unflipCards()
 */
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

/**
 * Désactiver les cartes
 * 
 * Retirer la fonction flipCard lorsqu'on click sur la première carte
 * Retirer la fonction flipCard lorsqu'on click sur la deuxième carte
 * 
 * Appeler la fonction resetBoard()
 */
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

/**
 * Activer le panneau de vérouillage
 * Lorsqu'une carte a été retournée, le flip est désactivé
 * Après le temps indiqué a la fin de la fonction,
 * 
 * Appeler la fonction resetBoard()
 */
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 800);
}

/**
 * Réinitialiser le panneau
 * 
 * Retourner les deux cartes choisis si elles ne sont pas identiques
 */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/**
 * Mélanger
 * 
 * Positionner aléatoirement les 12 cartes dans le panneau
 */
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


let start = document.querySelector('#start');
let stop  = document.querySelector('#stop');
let timerh1 = document.querySelector('.chrono');
let min = 0;
let sec = 0;

/**
 * Chronomètre
 * 
 * Mettre le chronomètre sous format 00:00
 * Ajouter +1 à chaque seconde
 * Quand les secondes sont au max, ajouter +1 aux minutes
 */
function Timer(){
  timerh1.innerHTML = min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
  sec++;
  if (sec >= 60) {
   sec = 0;
   min++;
  }
}

let timerId;

/**
 * Lorsqu'on clique sur le bouton start, ca lance la fonction Timer qui augmente de 1 à toutes les secondes
 */
start.addEventListener('click', () => {
  Timer();
  Timer();
  timerId = setInterval(Timer, 1000);
}, {once : true});

/**
 * Lorsqu'on clique sur le bouton stop, la fonction Timer s'arrête
 */
stop.addEventListener('click',() => {
  clearInterval(timerId)
}, {once : true} )