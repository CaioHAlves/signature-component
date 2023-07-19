import React from 'react';
import { usePaint } from './usePaint';

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
  drawingHeight = "50%", 
  drawingWidth = "50%", 
  backgroundColor = "#FFFFFF", 
  penColor,
  border
}: Props) => {

  const { onCanvasMouseDown, canvasRef } = usePaint({
    backgroundColor,
    drawingHeight,
    drawingWidth,
    lineWidth,
    penColor,
    border
  })

  return (
    <canvas
      onMouseDown={onCanvasMouseDown}
      id="canvasId"
      ref={canvasRef}
    />
  )
}
