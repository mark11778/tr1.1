import { socket } from "./App";
import React, { useEffect, useState } from 'react';

function InputBarFcn({quote, setTimerRunning}) {
    const [userEnteredWords, setuserEnteredWords] = useState([]);
    const [inputValue, setInputValue] = useState('');

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

          //stops the test once the length of both the inputed value and the quote are the same length
          setTimerRunning(false);
    
        //   let correctValues = quote.split("");
    
        //   let userAttempt = userAttemptStr.split("");
        //   let correctInput = 0;
    
        //   for (let i = 0; i <userAttempt.length; i++) // the user input is always <= quote length since the <input has a maxLength now
        //       if(correctValues[i] == userAttempt[i]) 
        //         correctInput += 1;
    
        //   setAccur(((correctInput/correctValues.length)*100));
    
        //   correctValues = quote.split(" ");
        //   userAttempt = userAttemptStr.split(" ");
        //   correctInput = 0;
    
        //   for (let i = 0; i <correctValues.length; i++) 
        //     if(userAttempt[i] != null) {
        //       if (i == 0) {
        //         correctValues[0] = correctValues[0].substring(1);
        //         correctValues[correctValues.length-1] = correctValues[correctValues.length-1].slice(0,-1);
        //       }
        //       if(correctValues[i] == userAttempt[i]) 
        //         correctInput += 1;
        //     }
            
        //     console.log(correctInput, timerSeconds)
        //   setWPM(((correctInput/timerSeconds)*60));
        }
      };



    useEffect(() => {
        setTimerRunning(true);
        console.log(inputValue)
    }, [inputValue]);

    useEffect(() => {
        setTimerRunning(false);
        setInputValue("");
    }, [quote]);


    return(
        <div id="inputbar">
        <input autoFocus id='inputbox' value={inputValue} onChange={(event) => handleInputChange(event, quote)} />
        <button onClick={() => socket.emit("needQuote")}> Restart </button>
      </div>
    );
}

export {InputBarFcn};