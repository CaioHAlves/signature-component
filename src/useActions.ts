export function useActions() {
  function clearSignature() {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
    const context = canvas ? canvas.getContext("2d") : null
  
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }
  
  function getImageSignature() {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
  
    if (canvas) {
      return canvas.toDataURL()
    } else {
      return ""
    }
  }

  function isEmpty() {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null

    if (canvas) {
      const ctx = canvas.getContext("2d")
      const imageData = ctx!.getImageData(0,0, canvas.width, canvas.height)
      const data = imageData.data

      const pixelBuffer = new Uint32Array(data.buffer)

      return !pixelBuffer.some((color) => { return color !== 0 })
    } else {
      return true
    }
  }

  return { clearSignature, getImageSignature, isEmpty }
}