const axios = require('axios');

let quote = null; // Use `null` for uninitialized value

async function fetchQuote() {
  // Immediately return the current quote if it's not null
  if (quote !== null) {
    const currentQuote = quote; // Store the current quote
    // Asynchronously update the quote for the next call
    APICall().then(updatedQuote => {
      quote = updatedQuote;
    }).catch(error => console.error('Error updating quote:', error));
    return currentQuote; // Return the current quote without waiting for the next one
  } else {
    // If quote is null, fetch a new one and wait for it
    return await APICall(); // Await the async call
  }
}

const APICall = async () => { // Make function async
  try {
    const response = await axios.get('https://api.quotable.io/random'); // Corrected URL and await the response
    const quoteContent = response.data.content; // Correctly access the quote content
    console.log(quoteContent);
    quote = quoteContent; // Cache the quote content for future calls
    return quoteContent;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error; // Re-throw the error so it can be caught elsewhere
  }
};

module.exports = fetchQuote; // Use CommonJS syntax for exporting