const letters = document.querySelector('.letter-placeholders')

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
