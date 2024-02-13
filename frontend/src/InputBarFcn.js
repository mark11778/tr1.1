import { socket } from "./App";
import React, { useEffect, useState } from 'react';

function InputBarFcn({quote, setTimerRunning, secs}) {
    const [userEnteredWords, setuserEnteredWords] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [wpm, setWPM] = useState(0);
    const [accur, setAccur] = useState(0);

    // updated the input box to only have the last two "words" entered and store this new/change data
    // into the UserEnteredWords array
    function inputHandler(userDataStr) {

        // gets the individual words from the user inputAs
        const userWords = userDataStr.split(" ");
        // stores the last word
        setuserEnteredWords(userEnteredWords => [...userEnteredWords, userWords[0]]);
        // updates the value that is being stored in the input bar
        
        const newInputStr = (userWords.slice(-2).join(" ")).trim()
        setInputValue(newInputStr)
    };

    const handleInputChange = (event, quote) => {
        // only calles this function when the length of the userData is longer than 3 words
        if(event.target.value.trim().split(" ").length > 2){
          inputHandler(event.target.value, setuserEnteredWords);
        }
        else {
          setInputValue(event.target.value)
        }
        
        const userAttemptStr = (userEnteredWords.join(" ") + " " +event.target.value).trimStart()
        
        if((userAttemptStr.length===(quote.length))) {
            setInputValue('')
            setuserEnteredWords([])
            results(userAttemptStr, quote)
          //stops the test once the length of both the inputed value and the quote are the same length
          setTimerRunning(false);
    

        }
      };

      const results = (userFinal, quote) => {
          let correctValues = quote.split("");
    
          let userAttempt = userFinal.split("");
          let correctInput = 0;
    
          for (let i = 0; i <userAttempt.length; i++) // the user input is always <= quote length since the <input has a maxLength now
              if(correctValues[i] == userAttempt[i]) 
                correctInput += 1;
    
          setAccur(((correctInput/correctValues.length)*100));
    
          correctValues = quote.split(" ");
          userAttempt = userFinal.split(" ");
          correctInput = 0;
    
          for (let i = 0; i <correctValues.length; i++) 
            if(userAttempt[i] != null) {
              if (i == 0) {
                correctValues[0] = correctValues[0].substring(1);
                correctValues[correctValues.length-1] = correctValues[correctValues.length-1].slice(0,-1);
              }
              if(correctValues[i] == userAttempt[i]) 
                correctInput += 1;
            }
            
            console.log(correctInput, secs)
          setWPM(((correctInput/secs)*60));
      }



    useEffect(() => {
        if (inputValue.length !== 0){
          setTimerRunning(true);
          console.log(inputValue)
        }

    }, [inputValue]);

    useEffect(() => {
      const userInput = (userEnteredWords.join(" ") + " " +inputValue).trimStart();
      if (inputValue.length !== 0){
        for (let i = 0; i < quote.length; i++) {
            const span = document.getElementById(`char-${i}`); 
            
            if (!span) return; 
      
            if (userInput[i] == undefined) {
              span.className = "null";
            } else if (userInput.charAt(i) == quote.charAt(i)){
              console.log(userInput.charAt(i) == quote.charAt(i), userInput.charAt(i))
              span.className = "cor";
            } else {
              span.className = "wro";
            }
        }
      }
      }, [inputValue, quote]);


    useEffect(() => {
        setTimerRunning(false);
        setuserEnteredWords([]);
        setInputValue("");
        for (let i = 0; i < quote.length; i++) {
          const span = document.getElementById(`char-${i}`); 
          
          if (!span) continue; 

          span.className = "null";
          
        }

    }, [quote]);


    return(
        <div id="inputbar">
        <input autoFocus id='inputbox' value={inputValue} onChange={(event) => handleInputChange(event, quote)} />
        <button onClick={() => socket.emit("needQuote")}> Restart </button>
        <h1>WPM: {wpm.toFixed(2)}          Acr: {accur.toFixed(2)}</h1>
      </div>
    );
}

export {InputBarFcn};