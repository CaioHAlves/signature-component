import React, { useEffect, useRef } from 'react';

export interface Props {
  lineWidth?: number;
  penColor?: string
  drawingWidth?: string;
  drawingHeight?: string;
  backgroundColor?: string
  border?: string
}

export function clearDrawing() {
  const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
  const context = canvas ? canvas.getContext("2d") : null

  if (context && canvas) {
    context.clearRect(0,0, canvas.width, canvas.height)
  }
}

export function getImage(): string {
  const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null

  if (canvas) {
    return canvas.toDataURL()
  } else {
    return ""
  }
}

export const Drawing = ({ 
  lineWidth = 5, 
  drawingHeight, 
  drawingWidth, 
  backgroundColor, 
  penColor = "red",
  border
}: Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let draw_bool = false;
  let mouseX = 0;
  let mouseY = 0;

  const getXY = (e: MouseEvent | TouchEvent) => {
    if (e instanceof TouchEvent) {
      mouseX = e.touches[0].clientX - canvasRef.current!.getBoundingClientRect().left
      mouseY = e.touches[0].clientY - canvasRef.current!.getBoundingClientRect().top
    } else {
      mouseX = e.clientX - canvasRef.current!.getBoundingClientRect().left
      mouseY = e.clientY - canvasRef.current!.getBoundingClientRect().top
    }
  }

  const stopDrawing = () => {
    if (canvasRef.current) {
      draw_bool = false;
      const context = canvasRef.current.getContext("2d")
      context!.beginPath()
    }
  }

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    draw_bool = true;
    getXY(e);
    //Start Drawing
    const context = canvasRef.current!.getContext("2d")
    context!.beginPath();
    context!.moveTo(mouseX, mouseY);
  }

  const drawOnCanvas = (e: MouseEvent | TouchEvent) => {
    getXY(e);
  
    if (draw_bool) {
      const context = canvasRef.current!.getContext("2d")
      context!.strokeStyle = penColor || "#000000"
      context!.lineWidth = lineWidth || 5
      context!.lineTo(mouseX, mouseY);
      context!.stroke();
      context!.globalCompositeOperation = "source-over";
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.width = drawingWidth || "100%";
      canvasRef.current.style.height = drawingHeight || "100%";
      canvasRef.current.style.background = backgroundColor || "#FFFFFF";
      canvasRef.current.style.border = border || "inherit";
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
    }
  }, [canvasRef.current])

  return (
    <canvas
      id="canvasId"
      onMouseDown={(e) => startDrawing(e.nativeEvent)}
      onMouseMove={(e) => drawOnCanvas(e.nativeEvent)}
      onTouchStart={(e) => startDrawing(e.nativeEvent)}
      onTouchMove={(e) => drawOnCanvas(e.nativeEvent)}
      onTouchEnd={stopDrawing}
      onTouchCancel={stopDrawing}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      ref={canvasRef}
    />
  )
}
