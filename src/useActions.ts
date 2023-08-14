function hexToRgb(color: string) {
  if (color.includes("#") && (color.split("#")[1].length === 6 || color.split("#")[1].length === 3)) {
    let hex = color.replace(/^#/, "")

    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    return { r, g, b }
  } else if (color.includes("rgb")) {
      let matches = color.match(/\d+/g)

      return {
        r: parseInt(matches![0]),
        g: parseInt(matches![1]),
        b: parseInt(matches![2]),
      }
  } else {
    return { r: 0, g: 0, b: 0}
  }
}


export function useActions() {
  function clearSignature() {
    const canvas = document.getElementById("canvasElement") as HTMLCanvasElement | null
    const context = canvas ? canvas.getContext("2d") : null
  
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }
  
  function getImageSignature() {
    const currentCanvas = document.getElementById("canvasElement") as HTMLCanvasElement | null

    const canvas = document.createElement("canvas")
    const context = canvas ? canvas.getContext("2d") : null

    try {
      if (context && canvas && currentCanvas) {
        canvas.width = currentCanvas.width
        canvas.height = currentCanvas.height
        context.drawImage(currentCanvas, 0, 0)

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        const { r, g, b } = hexToRgb(currentCanvas.style.background)
  
        if (currentCanvas.style.background) {
          for (let i = 0; i < data.length; i += 4) {
            let a = data[i + 3]
            
            if (a === 0) {
              data[i] = r
              data[i + 1] = g
              data[i + 2] = b
              data[i + 3] = 255
            }
          }
        }
  
        context.putImageData(imageData, 0, 0)
      }
      return canvas!.toDataURL()
    } catch (error) {
      return ""
    }
  }

  function isEmpty() {
    const canvas = document.getElementById("canvasElement") as HTMLCanvasElement | null

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

  function changeBackgroundColor(color: string) {
    const canvas = document.getElementById("canvasElement") as HTMLCanvasElement | null

    if (canvas) {
      canvas.style.background = color;
    }
  }

  return { clearSignature, getImageSignature, isEmpty, changeBackgroundColor }
}