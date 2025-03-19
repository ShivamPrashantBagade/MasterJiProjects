const title = document.getElementById("title");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");
const copyBtn = document.getElementById("copyQuote");

document.addEventListener("DOMContentLoaded", getNewQuote);

async function getNewQuote() {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

  let quoteContent = null;
  let authourName = null;

  try {
    const response = await fetch(url);
    const data = await response.json();

    quoteContent = data.data.content;
    authourName = data.data.author;
  } catch (error) {
    console.error(error);
  }

  quote.innerHTML = `<span class="commas">"</span>${quoteContent}<span class="commas">"</span>`;
  author.textContent = authourName;

  copyBtn.style.backgroundColor = " rgb(255, 255, 255)";
}

btn.addEventListener("click", getNewQuote);

copyBtn.addEventListener("click", function () {
  let copiedText = "";
  copiedText = quote.textContent;

  copiedText = copiedText.replace(/^"(.*)"$/, "$1");

  copyBtn.style.backgroundColor = " rgb(168, 168, 168)";
  console.log(copiedText);

  navigator.clipboard
    .writeText(copiedText)
    .then(() => {
      console.log("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
});
