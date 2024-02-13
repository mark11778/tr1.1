import React, { useEffect, useState } from 'react';

function Timer({ isRunning, setTimerRunning, quote }) {
  const [seconds, setSeconds] = useState(0);

  // this useEffect will execute when the isRunning var is changed 
  useEffect(() => {
    let intervalId = null;

    // if the timer is running the second varible will be updated at an interval of 1000 milliseconds
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  /*
  when the restart button is press and the restart boelan is updated this will change the current seconds to 0
  */
  useEffect(() => {
      setTimerRunning(false);
      setSeconds(0);
  }, [quote]);


  return (
    <div>
      <div>{seconds}</div>
    </div>
  );
}

export default Timer;



