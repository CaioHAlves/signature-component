interface ISignatureActions {
  clearSignature: () => void;
  getImageSignature: () => string;
}

export function useSignatureActions(): ISignatureActions {
  const clearSignature = () => {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
    const context = canvas ? canvas.getContext("2d") : null
  
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const getImageSignature = () => {
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement | null
  
    if (canvas) {
      return canvas.toDataURL()
    } else {
      return ""
    }
  }

  return { clearSignature, getImageSignature }
}