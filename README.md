# Install
````bash
npm i signature-component
````
````bash
yarn add signature-component
````
# Using
````js
import { useActions, Signature } from 'signature-component';

const { clearSignature, getImageSignature, isEmpty, changeBackgroundColor } = useActions()

const imageIsEmpty = () => {
  !isEmpty() ? console.log(getImageSignature()) : console.log("not image!")
}

return (
  <div>
    <div>
      <button onClick={() => clearSignature()}>
        Clear
      </button>
      <button onClick={imageIsEmpty}>
        Get image
      </button>
      <button onClick={() => changeBackgroundColor("#87CEEB")}>
        Background
      </button>
    </div>
    <Signature
      penColor="#000000"
      width={500}
      height={500}
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