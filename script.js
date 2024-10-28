const letters = document.querySelector('.letter-placeholders')
const pressedBeforeMsg = document.querySelector('.pressed-before')
const wrongLetters = document.querySelector('.wrong-letters p')
const youLostMsg = document.querySelector('.you-lost')

fetch("./words.json")
  .then((response) => response.json())
  .then((data) => {
    const randomWord = data.words[Math.floor(Math.random() * data.words.length)];
    console.log(randomWord); // Might output "blue", "green", etc.

    for (let i=0 ; i<randomWord.length ; i++) {
        const span = document.createElement('span')
        span.className = 'letter'
        span.dataset.letter = randomWord[i]

        letters.append(span)
    }
  })

let lettersTried = []
let wrongAnswers = []

// Event For Pressing a Key
document.addEventListener("keyup", (e) => {

  // Make Sure Play Again Message Isn't Shown
  if (!document.body.classList.contains('overlay')) {

    // Check If User Pressed a Letter
    let regExp = /^[a-z]$/img
    if (regExp.test(e.key)) {

      // Check If Letter Was Pressed Before To Print Message
      if (lettersTried.includes(e.key)) {      
        pressedBefore()
      } else {

        // Get All Letter Placeholder Spans
        const letterSpans = Array.from(document.querySelectorAll(".letter-placeholders span"))

        let found = false

        // Check If The Letter Is Found In The Word & Make It Visible
        letterSpans.forEach((span) => {
          if (span.dataset.letter === e.key) {
            span.classList.add("letter-visible")
            found = true
          }
        })

        // Check If The Letter Was Wrong
        if (found === false) {
          wrongAnswers.push(e.key)
          addWrongLetter(e.key)
        }

        // Add Letter To Tried Letters List
        lettersTried.push(e.key)
      }
    }
  }
})

// Event For Pressing Play Again
youLostMsg.addEventListener('click', e => {
  if (e.target.matches('button')) {
    // Refresh The Page & Run Script Again
    location.reload(true);
  }
})

// Function For Message When User Tries Same Letter Again
function pressedBefore() {
  pressedBeforeMsg.classList.add('pressed-before-visible')
  setTimeout(() => {
    pressedBeforeMsg.classList.remove('pressed-before-visible')
  }, 2000);
}

// Function When User Presses A Wrong Letter
function addWrongLetter(letter) {
  let wrongLettersTextNode = wrongAnswers.length === 1 ? document.createTextNode(`${letter}`) : document.createTextNode(`, ${letter}`)
  wrongLetters.appendChild(wrongLettersTextNode)

  switch(wrongAnswers.length) {
    case 1:
      document.querySelector('svg circle').classList.remove('body-part-hidden')
      break
    
    case 2:
      document.querySelector('svg circle + line').classList.remove('body-part-hidden')
      break
    
    case 3:
      document.querySelector('svg circle + line + line').classList.remove('body-part-hidden')
      break
    
    case 4:
      document.querySelector('svg line:nth-last-of-type(3)').classList.remove('body-part-hidden')
      break
    
    case 5:
      document.querySelector('svg line:nth-last-of-type(2)').classList.remove('body-part-hidden')
      break
    
    case 6:
      document.querySelector('svg line:last-of-type').classList.remove('body-part-hidden')    
      playAgainMsg()
  }
}

// Function To Show Play Again Message
function playAgainMsg() {

  document.body.classList.add('overlay')
  youLostMsg.classList.add('show-play-again')
}