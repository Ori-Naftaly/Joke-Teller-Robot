const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Disable and Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing our joke to voice API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "76c1f0b3bc254588aed42497d22c708b",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-speech
    tellMe(joke);
    //Disable button
    toggleButton();
  } catch (err) {
    console.log("whoops", error);
  }
}

// Event Listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
