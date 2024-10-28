const letters = document.querySelector('.letter-placeholders')
const pressedBeforeMsg = document.querySelector('.pressed-before')

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
      }

      // Add Letter To Tried Letters List
      lettersTried.push(e.key)
    }
  }
})

// Function For Message When User Tries Same Letter Again
function pressedBefore() {
  pressedBeforeMsg.classList.add('pressed-before-visible')
  setTimeout(() => {
    pressedBeforeMsg.classList.remove('pressed-before-visible')
  }, 2000);
}