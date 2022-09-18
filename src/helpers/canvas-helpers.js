
export const drawLine = (ctx, start, end, color = '#000000') => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);
  ctx.stroke();
}

export const drawEllipse = (ctx, center, size, color = '#000000') => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(center[0], center[1], size[0], size[1], 0, 0, 2 * Math.PI);
  ctx.fill();
}

export const drawText = (ctx, coordinate, text, fontSize, color = '#000000') => {
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px serif`;
  ctx.fillText(text, coordinate[0], coordinate[1]);
}