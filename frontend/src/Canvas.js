import React, { useRef, useEffect } from 'react'


const a = 2 * Math.PI / 6;
const r = 50;

function init(canvas) {
    const ctx = canvas.getContext('2d');
    for(let i = 0; i < 10; i++) {
      ctx.resetTransform()
      const height =  r* i*10// * Math.sin(a)
      if(i % 2 === 0) ctx.translate(r, height)
      else ctx.translate(0,height)
      drawGrid(ctx, canvas.width, canvas.height);
    }
  }

  function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

function drawGrid(ctx, width, height) {
    for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
        for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
            drawHexagon(ctx, x, y);
        }
    }
}

function drawHexagon(ctx, x, y) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
}

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    fitToContainer(canvas)
    init(canvas);
  }, [])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas