import React, { useEffect, useRef } from 'react';
import { PrevPoint, CanvasElement } from './interfacesAndTypes';

interface Props {
  lineWidth?: number;
  drawingWidth?: string;
  drawingHeight?: string;
  backgroundColor?: string
}

export const Drawing = ({ lineWidth = 5, drawingHeight = "50%", drawingWidth = "50%", backgroundColor = "#FFFFFF" }: Props) => {

  const canvasRef = useRef<CanvasElement>(null)
  const isDrawingRef = useRef(false)
  const prevPointRef = useRef<PrevPoint | null>(null);

  const mouseMoveListenerRef = useRef<any | null>(null);
  const mouseUpListenerRef = useRef<any | null>(null);

  function onCanvasMouseDown() {
    isDrawingRef.current = true;
  }

  function onDraw(ctx: CanvasRenderingContext2D | null, point: { x: number, y: number } | null, prevPoint: PrevPoint | null) {
    if (ctx) {
      ctx.beginPath()
      prevPoint = prevPoint ?? point;
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = "#000000";
      ctx.moveTo(prevPoint!.x, prevPoint!.y);
      ctx.lineTo(point!.x, point!.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(prevPoint!.x, prevPoint!.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  useEffect(() => {
    function computePointInCanvas(clientX: number, clientY: number) {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top
        }
      } else {
        return null;
      }

    }
    function initMouseMoveListener() {
      const mouseMoveListener = (e: { clientX: number, clientY: number }) => {
        if (isDrawingRef.current && canvasRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY);
          const ctx = canvasRef.current.getContext('2d');
          if (onDraw) onDraw(ctx, point, prevPointRef.current);
          prevPointRef.current = point;
        }
      }
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);
    }

    function initMouseUpListener() {
      const listener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      }
      mouseUpListenerRef.current = listener;
      window.addEventListener("mouseup", listener);
    }

    function cleanup() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    }

    initMouseMoveListener();
    initMouseUpListener();
    return () => cleanup();

  }, [onDraw, isDrawingRef.current])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.width = drawingWidth;
      canvasRef.current.style.height = drawingHeight;
      canvasRef.current.style.background = backgroundColor || "#FFFFFF"
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
    }
  }, [canvasRef.current])

  return (
    <canvas
      onMouseDown={onCanvasMouseDown}
      id="canvasId"
      ref={canvasRef}
    />
  )
}
