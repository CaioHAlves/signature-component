import React, { CSSProperties, useEffect, useRef, useState } from 'react';

export interface Props {
  lineWidth?: number;
  penColor?: string
  drawingWidth?: string;
  drawingHeight?: string;
  styles?: CSSProperties
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
  lineWidth, 
  drawingHeight, 
  drawingWidth,
  penColor,
  styles
}: Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawBool, setDrawBool] = useState(false)
  const [position, setPosition] = useState({ mouseX: 0, mouseY: 0 })

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.width = drawingWidth || "100%";
      canvasRef.current.style.height = drawingHeight || "100%";
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
    }
  }, [canvasRef.current, drawingWidth, drawingHeight])

  const stopDrawing = () => {
    if (canvasRef.current) {
      setDrawBool(false)
      const context = canvasRef.current.getContext("2d")
      context!.beginPath()
    }
  }

  const startDrawing = (e: MouseEvent | TouchEvent) => {
    setDrawBool(true);

    const context = canvasRef.current!.getContext("2d")
    context!.beginPath();

    if (e instanceof TouchEvent) {
      setPosition({
        mouseX: e.changedTouches[0].clientX - canvasRef.current!.getBoundingClientRect().left,
        mouseY: e.changedTouches[0].clientY - canvasRef.current!.getBoundingClientRect().top
      })
    } else {
      setPosition({
        mouseX: e.clientX - canvasRef.current!.getBoundingClientRect().left,
        mouseY: e.clientY - canvasRef.current!.getBoundingClientRect().top
      })
    }
  }

  const drawOnCanvas = (e: MouseEvent | TouchEvent) => {

    if (drawBool && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")!
      context.strokeStyle = penColor || "#000000"
      context.lineWidth = lineWidth || 5
      context.lineCap = "round"
      context.lineTo(position.mouseX, position.mouseY);
      context.stroke();
    }

    if (e instanceof TouchEvent) {
      setPosition({
        mouseX: e.changedTouches[0].clientX - canvasRef.current!.getBoundingClientRect().left,
        mouseY: e.changedTouches[0].clientY - canvasRef.current!.getBoundingClientRect().top
      })
    } else {
      setPosition({
        mouseX: e.clientX - canvasRef.current!.getBoundingClientRect().left,
        mouseY: e.clientY - canvasRef.current!.getBoundingClientRect().top
      })
    }
  }

  return (
    <canvas
      id="canvasId"
      onMouseDown={(e) => startDrawing(e.nativeEvent)}
      onMouseMove={(e) => drawOnCanvas(e.nativeEvent)}
      onTouchStart={(e) => startDrawing(e.nativeEvent)}
      onTouchMove={(e) => drawOnCanvas(e.nativeEvent)}
      onTouchEnd={stopDrawing}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      ref={canvasRef}
      style={styles}
    />
  )
}
