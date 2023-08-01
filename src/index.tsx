import React, { CSSProperties, useEffect, useRef, useState, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react'

export interface Props {
  lineWidth?: number
  penColor?: string
  width?: string
  height?: string
  styles?: CSSProperties
}

export const useCanvas = () => ({
  clearCanvas: () => {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
    const context = canvas ? canvas.getContext("2d") : null
  
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  },
  canvasToDataUrl: () => {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
  
    if (canvas) {
      return canvas.toDataURL()
    } else {
      return ""
    }
  }
})

export const Drawing = ({
  lineWidth,
  height,
  width,
  penColor,
  styles,
}: Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [drawBool, setDrawBool] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.width = width || "100%"
      canvasRef.current.style.height = height || "100%"
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
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
    setDrawBool(true)
    setPosition(getTouchPosition(event))
  }
  const touchMove = (event: ReactTouchEvent<HTMLCanvasElement>) => {
    drawOnCanvas()
    setPosition(getTouchPosition(event))
  }

  // Start or stop drawing on canvas
  const stopDrawing = () => {
    if (canvasRef.current) {
      setDrawBool(false)
      const context = canvasRef.current.getContext("2d")
      context!.beginPath()
    }
  }
  const drawOnCanvas = () => {
    window.addEventListener("touchstart", function (e) {
      if (e.target === canvasRef.current || e.cancelable) {
        e.preventDefault()
      }
    }, {passive: false})
    window.addEventListener("touchend", function (e) {
      if (e.target === canvasRef.current || e.cancelable) {
        e.preventDefault()
      }
    }, {passive: false})
    window.addEventListener("touchmove", function (e) {
      if (e.target === canvasRef.current || e.cancelable) {
        e.preventDefault()
      }
    }, {passive: false})

    if (drawBool && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")!
      context.strokeStyle = penColor || "#000000"
      context.lineWidth = lineWidth || 5
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
    />
  )
}
