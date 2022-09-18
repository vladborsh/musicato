import React, { useRef, useEffect } from 'react';
import { drawEllipse, drawLine, drawText } from '../../helpers/canvas-helpers';

let context;

const LINE_SPACE = 20;
const BASE_LINES_START = 100;

const NotesCanvas = (props) => {
  const canvasRef = useRef(null);
  
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
        [120, BASE_LINES_START + i * LINE_SPACE], 
        [180, BASE_LINES_START + i * LINE_SPACE]
      );
    }

    for (let i = -1; i >= lineOnCanvas; i--) {
      drawLine(
        ctx, 
        [120, BASE_LINES_START + i * LINE_SPACE], 
        [180, BASE_LINES_START + i * LINE_SPACE]
      );
    }

    drawEllipse(ctx, [150, BASE_LINES_START + (lineOnCanvas * LINE_SPACE)], [LINE_SPACE - 5, LINE_SPACE / 2]);

    if (props.selectednote.isSharp) {
      drawText(ctx, [170, BASE_LINES_START + (lineOnCanvas * LINE_SPACE) + 3], '#', 30)
    }
  }

  draw(context);

  useEffect(() => {
    const canvas = canvasRef.current
    context = canvas.getContext('2d');
    draw(context);
  })

  return (
  <div>
    <canvas ref={canvasRef}  width="300" height="300" {...props}/>
  </div>
  );
} 

export default NotesCanvas;
