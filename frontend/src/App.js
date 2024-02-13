import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import './styles.css';  
import io from 'socket.io-client';
import { QuoteFcn } from './QuoteFcn';
import { InputBarFcn } from './InputBarFcn';

export const socket = io.connect("http://localhost:3001");

function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [quote, setQuote] = useState("temp");
  const [second, setSeconds] = useState(0)

  // this needs to be in the parent file as it is what controlls alot of the other functions
  useEffect(() => {
    socket.on("newQuote", (data) => {
      setQuote(data.quote)
    })
  },[socket])



  useEffect(() => {
    setIsTimerRunning(false);
    document.getElementById("inputbox").focus();
  }, [quote])


    return (
      <div>
        <div id="everything">
          <div id="quoteStuff">
            <div id="Quote">
              <QuoteFcn quote ={quote} />
            </div>

            <div id="timer">
              <Timer isRunning={isTimerRunning} setTimerRunning ={setIsTimerRunning} quote={quote} seconds={second} setSeconds={setSeconds}/>
            </div>
          </div>

          <InputBarFcn quote={quote} setTimerRunning={setIsTimerRunning} secs={second}/>
        
      </div>
    </div>
  );
}
  
export default App;

