import axios from 'axios';

const fetchQuote = async (setQuote) => {
  try {
    const response = await axios.get('https://api.quotable.io/quotes/random');
    const quoteContent = response.data[0].content;
    console.log(quoteContent)
    setQuote(quoteContent);
    return quoteContent;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error; // Re-throw the error so it can be caught elsewhere
  }
};

export default fetchQuote;