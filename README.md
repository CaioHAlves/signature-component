# Install
````bash
npm i drawing-react
````
````bash
yarn add drawing-react
````
# Using
````js
import { Drawing, useCanvas } from 'drawing-react';

const { canvasToDataUrl, clearCanvas } = useCanvas()

return (
  <div>
    <div>
      <button onClick={() => clearCanvas()}>
        Clear
      </button>
      <button onClick={() => console.log(canvasToDataUrl())}>
        Get image
      </button>
    </div>
    <Drawing
      penColor="#000000"
      width="500px"
      height="500px"
    />
  </div>
)
````
# Contact
<div> 
  <a href="https://instagram.com/caio_damiao" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
  <a href = "mailto:caio.henriquealves@outlook.com"><img src="https://img.shields.io/badge/Email-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" target="_blank"></a>
  <a href = "https://github.com/CaioHAlves"><img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/caio-henrique-alves/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</div>