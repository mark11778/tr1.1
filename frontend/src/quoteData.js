import React, { useEffect, useState } from 'react';
import socket from './App';

function QuoteData() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const newQuote = (data) => {
            setQuote(data.quote);
        };

        socket.on("newQuote", newQuote);

        // Cleanup subscription
        return () => {
            socket.off("newQuote", newQuote);
        };
    }, []);

    const quoteWithSpans = quote.split('').map((letter, index) => (
        <span key={index} id={`char-${index}`} className="null">
            {letter}
        </span>
    ));

    return (
        <div>
            <div>{quoteWithSpans}</div>
        </div>
    );
}

export default QuoteData;