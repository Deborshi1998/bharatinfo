import React from 'react'

function LinearGradient() {
    const boxStyle = {
      width: "180px",
      margin: "auto",
    };
    const gradientStyle = {
      background:
        "linear-gradient(90deg, hsla(96, 100%, 50%, 1) 0%, hsla(60, 100%, 50%, 1) 50%, hsla(0, 100%, 50%, 1) 100%)",
      height: "20px",
      flex: "1",
    };
  return (
    <div>
      <div style={{...boxStyle, display: "flex"}} >
        <span>good</span>
        <span style={{flex:"1"}}></span>
        <span>bad</span>
      </div>
      <div style={{ ...boxStyle, ...gradientStyle }} ></div>
    </div>
  );
}

export default LinearGradient