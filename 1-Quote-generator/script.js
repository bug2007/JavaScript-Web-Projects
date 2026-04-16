// Get quotes from API
let apiQuotes;

function newQuote() {
    // pick one random quote from the apiQuotes arr
    const quote = apiQuotes[(Math.floor(Math.random() * apiQuotes.length))];
    console.log(quote);
}

async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();   //converting into a json obj
        newQuote();
    } catch (error) {

    }
}

getQuotes();