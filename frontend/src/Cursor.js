// Cursor.js
import React, { useState, useEffect } from 'react';
import './Cursor.css';

function Cursor() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Adjust the blinking speed as needed

    return () => clearInterval(interval);
  }, []);

//   const inputWithSpans = input.split('').map((letter) => (
//     <span id={"cursorPos"} className={"cursorPos"} >
//     {letter}     
//   </span>
// ));


  return (
    // <span className="cursor-container">
    //   {inputWithSpans}
      <span className={`cursor ${isVisible ? 'visible' : ''}`}/>
    // </span>
  );
}

export default Cursor;
