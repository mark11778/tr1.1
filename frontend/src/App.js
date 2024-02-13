import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import './styles.css';  
import io from 'socket.io-client';
import { QuoteFcn } from './QuoteFcn';
import { InputBarFcn } from './InputBarFcn';

export const socket = io.connect("http://localhost:3001");

function App() {
  //const [inputValue, setInputValue] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [restart, setRestart] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [quote, setQuote] = useState("temp");
  const [wpm, setWPM] = useState(0);
  const [accur, setAccur] = useState(0);
  //const [userEnteredWords, setuserEnteredWords] = useState([]);

  // this needs to be in the parent file as it is what controlls alot of the other functions
  useEffect(() => {
    socket.on("newQuote", (data) => {
      setQuote(data.quote)
    })
  },[socket])

  
  // function checker(userEnteredWords, check, quote) { // dependency injection - functions should only act on their arguments, when possible
  //   // sanitize the input
  //   if (null === check) return;
  //   if (typeof check !== 'string') return;
  //   if (check.length < 0) return; // etc

  //   const quoteChars = quote.split('');


  //   if(check === "636861726c6573206973206c616d650d0a") {
  //     for (let i = 0; i < quoteChars.length+1; i++) {
  //       const span = document.getElementById(`char-${i}`); 
    
  //       if (!span) continue; 
  //       else span.className = "null";

  //     }
  //     return;
  //   }
  //   return;
  // }

  // // updated the input box to only have the last two "words" entered and store this new/change data
  // // into the UserEnteredWords array
  // function inputHandler(userDataStr, setuserEnteredWords) {

  //   // gets the individual words from the user inputAs
  //   const userWords = userDataStr.split(" ");
  //   // stores the last word
  //   setuserEnteredWords(userEnteredWords => [...userEnteredWords, userWords[0]]);
  //   // updates the value that is being stored in the input bar
    
  //   const newInputStr = (userWords.slice(-2).join(" ")).trim()
  //   setInputValue(newInputStr)
  // };



  // const handleInputChange = (event, quote) => {
  //   // only calles this function when the length of the userData is longer than 3 words
  //   if(event.target.value.trim().split(" ").length > 2){
  //     inputHandler(event.target.value, setuserEnteredWords);
  //   }
  //   else {
  //     setInputValue(event.target.value)
  //   }

  //   //makes sure the time is only started once when the first char is entered, updates bools
  //   if (restart == false) {
  //     setIsTimerRunning(true);
  //     setRestart(true);
  //   }
    
  //   checker(userEnteredWords, event.target.value, quote);
  //   const userAttemptStr = (userEnteredWords.join(" ") + " " +event.target.value).trimStart()
    
  //   if(isTimerRunning && (userAttemptStr.length===(quote.length))) {
  //     //stops the test once the length of both the inputed value and the quote are the same length
  //     setIsTimerRunning(false);

  //     let correctValues = quote.split("");

  //     let userAttempt = userAttemptStr.split("");
  //     let correctInput = 0;

  //     for (let i = 0; i <userAttempt.length; i++) // the user input is always <= quote length since the <input has a maxLength now
  //         if(correctValues[i] == userAttempt[i]) 
  //           correctInput += 1;

  //     setAccur(((correctInput/correctValues.length)*100));

  //     correctValues = quote.split(" ");
  //     userAttempt = userAttemptStr.split(" ");
  //     correctInput = 0;

  //     for (let i = 0; i <correctValues.length; i++) 
  //       if(userAttempt[i] != null) {
  //         if (i == 0) {
  //           correctValues[0] = correctValues[0].substring(1);
  //           correctValues[correctValues.length-1] = correctValues[correctValues.length-1].slice(0,-1);
  //         }
  //         if(correctValues[i] == userAttempt[i]) 
  //           correctInput += 1;
  //       }
        
  //       console.log(correctInput, timerSeconds)
  //     setWPM(((correctInput/timerSeconds)*60));
  //   }
  // };


  //updates the seconds being displayed when the useEffect in the timer files calls this function
  const handleSecondsChange = (seconds) => {
    if (seconds !== timerSeconds) {
      setTimerSeconds(seconds);
    }
  };

  useEffect(() => {
    setIsTimerRunning(false);
    document.getElementById("inputbox").focus();
  }, [quote])


//userInput={(userEnteredWords.join(" ") + " " +inputValue).trimStart()}
    return (
      <div>
        <div id="everything">
          <div id="quoteStuff">
            <div id="Quote">
              <QuoteFcn quote ={quote} />
            </div>

            <div id="timer">
              <Timer isRunning={isTimerRunning} setTimerRunning ={setIsTimerRunning} quote={quote} />
            </div>
          </div>

          <InputBarFcn quote={quote} setTimerRunning={setIsTimerRunning}/>

        {/* <div id="inputbar">
          <input autoFocus id='inputbox' value={inputValue} onChange={(event) => handleInputChange(event, quote)} />
          <button onClick={() => socket.emit("needQuote")}> Restart </button>
        </div> */}
        <h1>WPM: {wpm.toFixed(2)}          Acr: {accur.toFixed(2)}</h1>
      </div>
    </div>
  );
}
  
export default App;

