const axios = require('axios');

// let quote = null; // Use `null` for uninitialized value

async function fetchQuote() {
  // if (quote === null) { // Check if `quote` is `null`
    return await APICall(); // Await the async call
  // } else {
  //   return quote;
  // }
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