interface ICanvasActions {
  clearCanvas: () => void;
  canvasToDataUrl: () => string;
}

export function useCanvasActions(): ICanvasActions {
  const clearCanvas = () => {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
    const context = canvas ? canvas.getContext("2d") : null
  
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const canvasToDataUrl = () => {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
  
    if (canvas) {
      return canvas.toDataURL()
    } else {
      return ""
    }
  }

  return { clearCanvas, canvasToDataUrl }
}