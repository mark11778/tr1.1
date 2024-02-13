import { socket } from "./App";
import React, { useEffect, useState } from 'react';

function QuoteFcn({quote}) {

      // on first load will call to get a quote
      useEffect(() => {
        socket.emit("needQuote");
      }, []);


    //   useEffect(() => {
    //     for (let i = 0; i < quote.length; i++) {
    //         const span = document.getElementById(`char-${i}`); 
            
    //         if (!span) return; 
    //         console.log(userInput, userInput.charAt(i), quote.charAt(i))
      
    //         if (userInput[i] == undefined) {
    //           span.className = "null";
    //         } else if (userInput.charAt(i) == quote.charAt(i)){
    //           console.log(userInput.charAt(i) == quote.charAt(i), userInput.charAt(i))
    //           span.className = "cor";
    //         } else {
    //           span.className = "wro";
    //         }
    //     }
    //   }, [userInput, quote]);


    //converts the Quote from a string to individual spans so the letters can be colored individually
    const quoteWithSpans=quote.split('').map((letter, index) => (
        <span key={index} id={`char-${index}`} class="null">
        {letter}
        </span>
    ));

  return (
    <div>
        {quoteWithSpans}
    </div>
  );

}
  export {QuoteFcn};