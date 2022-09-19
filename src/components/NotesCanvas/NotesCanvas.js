import React, { useRef, useEffect, useState } from 'react';
import { drawEllipse, drawLine, drawText } from '../../helpers/canvas-helpers';
import baseClef from '../../assets/base-clef.png';
import trebleClef from '../../assets/treble-clef.png';

let context;

const LINE_SPACE = 20;
const BASE_LINES_START = 100;

const NotesCanvas = (props) => {
  const canvasRef = useRef(null);
  const trebleClefRef = useRef(null);
  const baseClefRef = useRef(null);
  const [trebleClefImg, setTrebleClefImg] = useState(null);
  const [baseClefImg, setBaseClefImg] = useState(null);
  
  const draw = (ctx) => {
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    for (let i = 0; i < 5; i++) {
      drawLine(
        ctx, 
        [0, BASE_LINES_START + i * LINE_SPACE], 
        [300, BASE_LINES_START + i * LINE_SPACE]
      );
    }

    const lineOnCanvas = (4 - props.selectednote.noteLine);

    for (let i = 5; i <= lineOnCanvas; i++) {
      drawLine(
        ctx, 
        [130, BASE_LINES_START + i * LINE_SPACE], 
        [190, BASE_LINES_START + i * LINE_SPACE]
      );
    }

    for (let i = -1; i >= lineOnCanvas; i--) {
      drawLine(
        ctx, 
        [130, BASE_LINES_START + i * LINE_SPACE], 
        [190, BASE_LINES_START + i * LINE_SPACE]
      );
    }

    drawEllipse(ctx, [160, BASE_LINES_START + (lineOnCanvas * LINE_SPACE)], [LINE_SPACE - 5, LINE_SPACE / 2]);

    if (props.clef === 'base' && baseClefImg) {
      ctx.drawImage(baseClefImg, 21, 90, 70, 100);
    }

    if (props.clef === 'treble' && trebleClefImg) {
      ctx.drawImage(trebleClefImg, 21, 85, 60, 120);
    }

    if (props.selectednote.isSharp) {
      drawText(ctx, [180, BASE_LINES_START + (lineOnCanvas * LINE_SPACE) + 3], '#', 30)
    }
  }

  draw(context);

  useEffect(() => {
    const canvas = canvasRef.current;
    setTrebleClefImg(trebleClefRef.current);
    setBaseClefImg(baseClefRef.current);
    context = canvas.getContext('2d');
    draw(context);
  })

  return (
  <div>
    <canvas ref={canvasRef}  width="300" height="300" {...props}/>
    <div style={{display: 'none'}}>
      <img ref={trebleClefRef} id="treble-clef-source" src={trebleClef}/>
      <img ref={baseClefRef} id="base-clef-source" src={baseClef}/>
    </div>
  </div>
  );
} 

export default NotesCanvas;
