fetch("./words.json")
  .then((response) => response.json())
  .then((data) => {
    const randomWord = data.words[Math.floor(Math.random() * data.words.length)];
    console.log(randomWord); // Might output "blue", "green", etc.
  })
