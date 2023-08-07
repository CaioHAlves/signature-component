import React, { CSSProperties, useEffect, useRef, useState, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react'

export interface ISignature {
  lineWidth?: number
  penColor?: string
  width?: string
  height?: string
  styles?: CSSProperties
}

export const Signature = ({
  lineWidth,
  height,
  width,
  penColor,
  styles,
}: ISignature) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [drawBool, setDrawBool] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
      if (width) {
        canvasRef.current.style.width = width
      }

      if (height) {
        canvasRef.current.style.height = height
      }
    }
  }, [canvasRef.current, width, height])

  const mouseDown = (event: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setDrawBool(true)
    setPosition(getMousePosition(event))
  }
  const mouseMove = (event: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setPosition(getMousePosition(event))
    drawOnCanvas()
  }

  const touchStart = (event: ReactTouchEvent<HTMLCanvasElement>) => {
    window.addEventListener("touchstart", function (e) {
      if (e.target === canvasRef.current) {
        e.preventDefault()
      }
    }, {passive: false})
    setDrawBool(true)
    setPosition(getTouchPosition(event))
  }
  const touchMove = (event: ReactTouchEvent<HTMLCanvasElement>) => {
    window.addEventListener("touchmove", function (e) {
      if (e.target === canvasRef.current) {
        e.preventDefault()
      }
    }, {passive: false})
    drawOnCanvas()
    setPosition(getTouchPosition(event))
  }

  // Start or stop drawing on canvas
  const stopDrawing = () => {
    window.addEventListener("touchend", function (e) {
      if (e.target === canvasRef.current) {
        e.preventDefault()
      }
    })

    if (canvasRef.current) {
      setDrawBool(false)
      const context = canvasRef.current.getContext("2d")
      context!.beginPath()
    }
  }
  const drawOnCanvas = () => {
    if (drawBool && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")!
      context.strokeStyle = penColor || "#000000"
      context.lineWidth = lineWidth || 2
      context.lineCap = "round"
      context.lineTo(position.x, position.y)
      context.stroke()
    }
  }

  // Get positions of the mouse and touch
  const getMousePosition = (mouseEvent: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const boundingClient = canvasRef.current!.getBoundingClientRect()

    return {
      x: mouseEvent.clientX - boundingClient.left,
      y: mouseEvent.clientY - boundingClient.top
    }
  }
  const getTouchPosition = (event: ReactTouchEvent<HTMLCanvasElement>) => {
    const boundingClient = canvasRef.current!.getBoundingClientRect()

    return {
      x: event.touches[0].clientX - boundingClient.left,
      y: event.touches[0].clientY - boundingClient.top
    }
  }

  return (
    <canvas
      id="canvasId"
      onMouseDown={(e) => mouseDown(e)}
      onMouseMove={(e) => mouseMove(e)}
      onTouchStart={(e) => touchStart(e)}
      onTouchMove={(e) => touchMove(e)}
      onTouchEnd={stopDrawing}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      ref={canvasRef}
      style={{
        ...styles,
        "touchAction": "none",
        "msTouchAction": "none"
      }}
    ></canvas>
  )
}
